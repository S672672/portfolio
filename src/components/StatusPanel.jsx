import React, { useState, useEffect } from 'react';

function getGreeting(hour) {
  if (hour < 6) return { text: 'Burning the midnight oil', emoji: '🌙' };
  if (hour < 12) return { text: 'Good morning', emoji: '☀️' };
  if (hour < 17) return { text: 'Good afternoon', emoji: '🌤️' };
  if (hour < 21) return { text: 'Good evening', emoji: '🌆' };
  return { text: 'Working late', emoji: '🦉' };
}

function getCalendarData(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return { firstDay, daysInMonth };
}

export default function StatusPanel() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 30000);
    return () => clearInterval(t);
  }, []);

  const greeting = getGreeting(time.getHours());
  const year = time.getFullYear();
  const month = time.getMonth();
  const today = time.getDate();
  const { firstDay, daysInMonth } = getCalendarData(year, month);
  const monthName = time.toLocaleDateString('en-US', { month: 'short' });
  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  // Build grid: empty cells + day cells
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div style={{
      width: '100%', display: 'flex', flexDirection: 'column',
      alignItems: 'center', gap: 14, marginTop: 4,
    }}>
      {/* ── Greeting ── */}
      <div style={{ textAlign: 'center' }}>
        <div style={{
          fontSize: 11, color: 'var(--os-text-secondary)',
          fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.3px',
          fontWeight: 500,
        }}>
          {greeting.emoji} {greeting.text}
        </div>
      </div>

      {/* ── Divider ── */}
      <div style={{
        width: 40, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(90,169,255,0.15), transparent)',
      }} />

      {/* ── Mini Calendar ── */}
      <div style={{
        width: '100%',
        background: 'rgba(8,12,20,0.7)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(90,169,255,0.06)',
        borderRadius: 10,
        padding: '10px 12px',
        transition: 'border-color 0.3s ease',
      }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(90,169,255,0.15)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(90,169,255,0.06)'; }}
      >
        {/* Month header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: 10,
        }}>
          <span style={{
            fontSize: 11, fontWeight: 700, color: 'var(--os-text)',
            fontFamily: 'Inter, sans-serif', letterSpacing: '-0.3px',
          }}>
            {monthName} {year}
          </span>
          <span style={{
            fontSize: 8, color: 'var(--os-accent)',
            fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: '0.5px', opacity: 0.6,
          }}>
            {time.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}
          </span>
        </div>

        {/* Day headers */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)',
          marginBottom: 4,
        }}>
          {dayNames.map((d) => (
            <div key={d} style={{
              textAlign: 'center', fontSize: 8,
              color: 'var(--os-text-faint)',
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: '0.5px', fontWeight: 600,
              padding: '2px 0',
            }}>
              {d}
            </div>
          ))}
        </div>

        {/* Day grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 1,
        }}>
          {cells.map((day, i) => {
            if (day === null) return <div key={`empty-${i}`} />;
            const isToday = day === today;
            return (
              <div key={day} style={{
                textAlign: 'center', fontSize: 9, padding: '3px 0',
                fontFamily: "'JetBrains Mono', monospace",
                borderRadius: isToday ? 5 : 0,
                background: isToday ? 'rgba(90,169,255,0.12)' : 'transparent',
                color: isToday ? 'var(--os-accent)' : 'var(--os-text-dim)',
                fontWeight: isToday ? 700 : 400,
                border: isToday ? '1px solid rgba(90,169,255,0.2)' : '1px solid transparent',
                transition: 'all 0.2s ease',
              }}>
                {day}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
