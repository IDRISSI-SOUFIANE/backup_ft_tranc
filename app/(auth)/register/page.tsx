"use client";
import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch('/api/auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, first_name: firstName, last_name: lastName, password }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Register failed');
      window.location.href = '/';
    } catch (err: any) {
      setError(err.message || 'Server error');
    }
  }

  return (
    <div style={{ maxWidth: 520, margin: '48px auto', padding: 24, border: '1px solid #eaeaea', borderRadius: 8 }}>
      <h2 style={{ marginBottom: 12 }}>Create account</h2>
      <form onSubmit={submit}>
        <label style={{ display: 'block', marginBottom: 8 }}>
          First name
          <input value={firstName} onChange={e => setFirstName(e.target.value)} required style={{ width: '100%', padding: 8, marginTop: 4 }} />
        </label>
        <label style={{ display: 'block', marginBottom: 8 }}>
          Last name
          <input value={lastName} onChange={e => setLastName(e.target.value)} required style={{ width: '100%', padding: 8, marginTop: 4 }} />
        </label>
        <label style={{ display: 'block', marginBottom: 8 }}>
          Email
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" required style={{ width: '100%', padding: 8, marginTop: 4 }} />
        </label>
        <label style={{ display: 'block', marginBottom: 8 }}>
          Password
          <input value={password} onChange={e => setPassword(e.target.value)} type="password" required style={{ width: '100%', padding: 8, marginTop: 4 }} />
        </label>
        {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
        <button style={{ padding: '8px 12px' }} type="submit">Create account</button>
      </form>
    </div>
  );
}