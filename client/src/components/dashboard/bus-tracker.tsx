import { useEffect, useState } from "react";

export default function BusTracker() {
  const [busData, setBusData] = useState<any[]>([]);
  const [mode, setMode] = useState("normal"); // normal, lite, offline, feature

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/bus/positions"); // from your backend
        const data = await res.json();

        // Save in cache for offline
        localStorage.setItem("lastBusData", JSON.stringify(data));

        setBusData(data);
        setMode("normal");
      } catch (err) {
        // If fetch fails → fallback
        const cached = localStorage.getItem("lastBusData");
        if (cached) {
          setBusData(JSON.parse(cached));
          setMode("offline");
        } else {
          setMode("feature");
        }
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 15000); // poll every 15s
    return () => clearInterval(interval);
  }, []);

  // Check for slow network
  useEffect(() => {
    const navAny = navigator as any;
    if (navAny.connection) {
      const conn = navAny.connection;
      if (conn.downlink < 0.5) { // very slow internet
        setMode("lite");
      }
    }
  }, []);

  return (
    <div className="p-4">
      {mode === "normal" && (
        <div>
          <h2 className="text-xl font-bold">Live Map</h2>
          {/* TODO: Integrate Mapbox/Leaflet with markers */}
          <pre>{JSON.stringify(busData, null, 2)}</pre>
        </div>
      )}

      {mode === "lite" && (
        <div>
          <h2 className="text-xl font-bold">Lite Mode (Text Only)</h2>
          <ul>
            {busData.map((bus) => (
              <li key={bus.id}>
                Bus {bus.id}: ETA {bus.eta}
              </li>
            ))}
          </ul>
        </div>
      )}

      {mode === "offline" && (
        <div>
          <h2 className="text-xl font-bold">Offline Mode</h2>
          <p>Showing last known data (may be outdated)</p>
          <ul>
            {busData.map((bus) => (
              <li key={bus.id}>
                Bus {bus.id}: Last ETA {bus.eta}
              </li>
            ))}
          </ul>
        </div>
      )}

      {mode === "feature" && (
        <div>
          <h2 className="text-xl font-bold">No Internet Mode</h2>
          <p>
            You can still get bus info:  
            <br /> 📩 Send SMS: <b>BUS 101</b> to <b>12345</b>  
            <br /> 📞 Missed call: <b>+91-98765-43210</b>  
            <br /> ☎️ IVR Helpline: <b>1800-111-222</b>
          </p>
        </div>
      )}
    </div>
  );
}

<div className="flex gap-2 mb-4">
  <button
    onClick={() => setMode("normal")}
    className="px-3 py-1 bg-green-500 text-white rounded"
  >
    Normal
  </button>
  <button
    onClick={() => setMode("lite")}
    className="px-3 py-1 bg-yellow-500 text-white rounded"
  >
    Slow Internet
  </button>
  <button
    onClick={() => setMode("offline")}
    className="px-3 py-1 bg-gray-500 text-white rounded"
  >
    No Internet (Smartphone)
  </button>
  <button
    onClick={() => setMode("feature")}
    className="px-3 py-1 bg-blue-500 text-white rounded"
  >
    No Internet (Feature Phone)
  </button>
</div>
function setMode(arg0: string): void {
  throw new Error("Function not implemented.");
}

