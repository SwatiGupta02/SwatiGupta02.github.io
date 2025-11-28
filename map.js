// map.js - Leaflet map initializer
// Behavior:
// - Reads optional window.MAP_PINS (array of {lat, lng, title, iconUrl})
// - Reads optional window.MAP_ROUTE (array of [lat, lng]) to draw a polyline
// - Falls back to a couple sample pins if none provided

(function () {
  function initLeafletMap() {
    if (!document.getElementById('map')) return;

    // default center (Golden Fields Resort area)
    const defaultCenter = [18.52043, 73.49074];

    // read pins from window, or use sample. If you provide `window.MAP_PINS` it will
    // override these defaults. Sample pins below include `color` so they render as
    // colored SVG markers (red, blue, green, golden).
    const pins = Array.isArray(window.MAP_PINS) && window.MAP_PINS.length ? window.MAP_PINS : [
      { lat: 18.52043, lng: 73.49074, title: 'Golden Fields Resort', color: '#c47a2c' }, // golden
      { lat: 18.52350, lng: 73.49320, title: 'Konkan Kinara', color: '#e74c3c' }, // red
      { lat: 18.52500, lng: 73.49500, title: 'The Forresta', color: '#3498db' }, // blue
      { lat: 18.52650, lng: 73.48850, title: 'Pune International Airport', color: '#2ecc71' }  // green
    ];

    const route = Array.isArray(window.MAP_ROUTE) && window.MAP_ROUTE.length ? window.MAP_ROUTE : null;

    const center = pins.length ? [pins[0].lat, pins[0].lng] : defaultCenter;

    // create map (enable all zoom gestures)
    const map = L.map('map', { 
      scrollWheelZoom: true,  // enable mouse wheel zoom
      touchZoom: true,        // enable touch pinch zoom
      doubleClickZoom: true,  // enable double-click zoom
      tap: true               // enable tap gestures
    }).setView(center, 13);

    // add OpenStreetMap tiles (free)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
    }).addTo(map);

    // helper to create an icon if provided; supports either an image URL or a simple
    // colored SVG marker via `color` (hex or named color). Returns null when
    // no custom icon is requested.
    function createIcon(iconUrl, color) {
      if (iconUrl) {
        return L.icon({
          iconUrl: iconUrl,
          iconSize: [40, 40],
          iconAnchor: [20, 40],
          popupAnchor: [0, -36]
        });
      }
      if (!color) return null;

      // simple pin-shaped SVG (keeps payload small) with the requested fill color
      const svg = `<?xml version="1.0" encoding="UTF-8"?><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='28' height='40'>` +
        `<path d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z' fill='${color}'/>` +
        `<circle cx='12' cy='9' r='2.5' fill='white' opacity='0.9'/></svg>`;

      // base64-encode the SVG for use as a data URL
      const base64 = typeof btoa === 'function' ? btoa(svg) : Buffer.from(svg).toString('base64');
      const dataUrl = 'data:image/svg+xml;base64,' + base64;
      return L.icon({ iconUrl: dataUrl, iconSize: [28, 40], iconAnchor: [14, 40], popupAnchor: [0, -36] });
    }

    // red circle icon for route start/end
    const redIcon = L.icon({
      iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSI5IiBmaWxsPSIjRkY0NDQ0Ii8+PC9zdmc+',
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -12]
    });

    const markerGroup = L.featureGroup();
    const markerMap = {}; // store markers by pin index for later reference

    pins.forEach((p, idx) => {
      try {
        const coords = [parseFloat(p.lat), parseFloat(p.lng)];
        const opts = {};
        // allow pins to specify either `iconUrl` (image) or `color`/`pinColor` (SVG)
        const color = p.color || p.pinColor || null;
        const icon = createIcon(p.iconUrl, color);
        if (icon) opts.icon = icon;
        // popup should contain a Google Maps link labeled "Maps"
        // Prefer the explicit `p.mapsUrl` supplied in `window.MAP_PINS`.
        // If it's not present or doesn't look like a valid URL, fall back
        // to a lat/lng search URL as a last resort.
        let mapsUrl = '';
        if (p.mapsUrl && /^https?:\/\//i.test(p.mapsUrl)) {
          mapsUrl = p.mapsUrl;
        } else if (p.mapsUrl) {
          // if user provided something without protocol, prefix https://
          mapsUrl = 'https://' + p.mapsUrl;
        } else {
          mapsUrl = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(p.lat + ',' + p.lng);
        }
        const popupHtml = `<a href="${mapsUrl}" target="_blank" rel="noopener noreferrer">Maps</a>`;
        const marker = L.marker(coords, opts)
          .bindPopup(popupHtml)
          .bindTooltip(p.title || '', { permanent: true, direction: 'top', className: 'pin-tooltip' });
        marker.addTo(markerGroup);
        markerMap[idx] = marker;
      } catch (e) {
        // skip invalid pin
        // eslint-disable-next-line no-console
        console.warn('Invalid pin', p);
      }
    });

    markerGroup.addTo(map);

    // draw route polyline if provided
    if (route) {
      try {
        const latlngs = route.map(pt => [parseFloat(pt[0]), parseFloat(pt[1])]);
        const poly = L.polyline(latlngs, { color: 'blue', weight: 4, opacity: 0.7 }).addTo(map);
        // include polyline into bounds
        markerGroup.addLayer(poly);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn('Invalid route', route);
      }
    }

    // fit map to markers+route if available
    const bounds = markerGroup.getBounds();
    if (bounds.isValid()) {
      map.fitBounds(bounds.pad(0.2));
    } else {
      map.setView(center, 13);
    }
    
    // --- Routing UI: let user pick any 2 pins and show route + estimated time ---
    const controlsContainer = document.getElementById('map-controls');
    if (controlsContainer) {
      // build selects
      // --- Jump-to dropdown (prefers slugs) ---
        controlsContainer.innerHTML = '';
      const fromSelect = document.createElement('select');
      const toSelect = document.createElement('select');
      fromSelect.setAttribute('aria-label', 'From');
      toSelect.setAttribute('aria-label', 'To');

      // default empty options for From / To
      const emptyFrom = document.createElement('option');
      emptyFrom.value = '';
      emptyFrom.textContent = 'From...';

      const emptyTo = document.createElement('option');
      emptyTo.value = '';
      emptyTo.textContent = 'To...';

      fromSelect.appendChild(emptyFrom);
      toSelect.appendChild(emptyTo);

      pins.forEach((p, idx) => {
        const opt1 = document.createElement('option');
        opt1.value = String(idx);
        opt1.textContent = p.title || (`Pin ${idx+1}`);
        fromSelect.appendChild(opt1);

        const opt2 = opt1.cloneNode(true);
        toSelect.appendChild(opt2);
      });

      const clearBtn = document.createElement('button');
      clearBtn.textContent = 'Clear';
      clearBtn.type = 'button';

      controlsContainer.appendChild(fromSelect);
      controlsContainer.appendChild(toSelect);
      controlsContainer.appendChild(clearBtn);

      // summary element for distance/time (no directions)
      const routeSummary = document.createElement('div');
      routeSummary.className = 'route-summary';
      routeSummary.style.marginTop = '8px';
      routeSummary.textContent = '';
      controlsContainer.appendChild(routeSummary);

      let routingControl = null;
      let routeEndMarkers = []; // store red markers for route endpoints

      // helper to compute and show route between two pin indices
      function computeRoute(fromIdx, toIdx) {
        // validate
        if (Number.isNaN(fromIdx) || Number.isNaN(toIdx) || fromIdx === toIdx) {
          if (routeSummary) routeSummary.textContent = 'Choose two different pins.';
          return;
        }
        // remove previous
        clearRouting();

        const a = pins[fromIdx];
        const b = pins[toIdx];
        if (!a || !b) {
          if (routeSummary) routeSummary.textContent = 'Invalid selection.';
          return;
        }

        // Add red markers at start and end
        const redStart = L.marker([a.lat, a.lng], { icon: redIcon }).addTo(map);
        const redEnd = L.marker([b.lat, b.lng], { icon: redIcon }).addTo(map);
        routeEndMarkers.push(redStart, redEnd);

        // Create routing control using Leaflet Routing Machine (uses OSRM by default)
        routingControl = L.Routing.control({
          waypoints: [ L.latLng(a.lat, a.lng), L.latLng(b.lat, b.lng) ],
          showAlternatives: false,
          routeWhileDragging: false,
          fitSelectedRoute: false, // we'll fit manually
          createMarker: function() { return null; }, // prevent duplicate markers
          lineOptions: {
            styles: [{ color: '#4285F4', opacity: 0.9, weight: 5 }] // Google Maps blue
          },
          containerClassName: 'leaflet-routing-container-custom'
        }).addTo(map);

        // Hide the routing control's directions panel (we don't want it visible)
        try {
          const rc = routingControl.getContainer();
          if (rc && rc.style) rc.style.display = 'none';
        } catch (e) {}

        // Fit map to show both endpoints with padding
        try {
          const bounds = L.latLngBounds([ [a.lat, a.lng], [b.lat, b.lng] ]);
          map.fitBounds(bounds.pad(0.2));
        } catch (e) {}

        // when route is found, show a short distance/time summary in the controls
        routingControl.on('routesfound', function(e) {
          const routes = e.routes;
          if (!routes || !routes.length) return;
          const summary = routes[0].summary; // { totalDistance, totalTime }
          const seconds = Math.round(summary.totalTime || 0);
          const mins = Math.round(seconds / 60);
          const km = ((summary.totalDistance || 0) / 1000).toFixed(1);
          if (routeSummary) routeSummary.textContent = `Distance: ${km} km — Estimated time: ${mins} min`;
        });

        routingControl.on('routingerror', function(err) {
          if (routeSummary) routeSummary.textContent = 'Routing error — unable to compute route.';
        });
      }

      function clearRouting() {
        if (routingControl) {
          try { routingControl.remove(); } catch (e) {}
          routingControl = null;
        }
        // remove red endpoint markers
        routeEndMarkers.forEach(m => {
          try { m.remove(); } catch (e) {}
        });
        routeEndMarkers = [];
        // clear summary text
        if (routeSummary) routeSummary.textContent = '';
      }

      // --- Fit All control (bottom-left) to bring all pins into view ---
      const FitAllControl = L.Control.extend({
        options: { position: 'bottomleft' },
        onAdd: function(mapInstance) {
          const btn = L.DomUtil.create('button', 'map-fitall-btn');
          btn.innerHTML = 'Show All';
          btn.title = 'Show all pins';
          L.DomEvent.on(btn, 'click', function(e) {
            L.DomEvent.stopPropagation(e);
            L.DomEvent.preventDefault(e);
            const b = markerGroup.getBounds();
            if (b && b.isValid()) mapInstance.fitBounds(b.pad(0.2));
          });
          return btn;
        }
      });
      map.addControl(new FitAllControl());

      clearBtn.addEventListener('click', () => {
        clearRouting();
        fromSelect.value = '';
        toSelect.value = '';
      });

      // automatically compute route whenever both selects have a valid selection
      function maybeComputeRoute() {
        const fromIdx = parseInt(fromSelect.value, 10);
        const toIdx = parseInt(toSelect.value, 10);
        if (!Number.isNaN(fromIdx) && !Number.isNaN(toIdx) && fromIdx !== toIdx) {
          computeRoute(fromIdx, toIdx);
        }
      }

      fromSelect.addEventListener('change', maybeComputeRoute);
      toSelect.addEventListener('change', maybeComputeRoute);

      // On load: deep-link handling (supports #pin=slug and ?pin=slug)
      (function handleDeepLink() {
        try {
          const hashMatch = (window.location.hash || '').match(/pin=([^&]+)/i);
          const params = new URLSearchParams(window.location.search || '');
          const q = params.get('pin');
          const slug = hashMatch ? decodeURIComponent(hashMatch[1]) : (q ? q : null);
          if (slug && markerMap[slug]) {
            // small delay so map initialization finishes
            setTimeout(() => {
              const sel = document.getElementById('map-jump-select');
              if (sel) sel.value = slug;
              try { jumpToSlug(slug); } catch (e) {}
            }, 250);
          }
        } catch (e) {}
      })();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLeafletMap);
  } else {
    initLeafletMap();
  }
})();
