
import { useState } from 'react'

const skillOptions = [
  'Java',
  'Python',
  'C Programming',
  'SQL',
  'HTML & CSS',
  'JavaScript',
  'React',
  'Spring Boot',
  'Data Structures',
  'Communication'
]

function Register() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: 'Computer Science',
    studyYear: '3',
    skills: []
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target

    setForm(previous => ({
      ...previous,
      [name]: value
    }))
  }

  function handleSkillChange(skill) {
    setForm(previous => ({
      ...previous,
      skills: previous.skills.includes(skill)
        ? previous.skills.filter(item => item !== skill)
        : [...previous.skills, skill]
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setMessage('')
    setSuccess(false)

    if (!form.fullName.trim()) {
      setMessage('Please enter your full name.')
      return
    }

    if (form.password !== form.confirmPassword) {
      setMessage('Passwords do not match.')
      return
    }

    if (form.password.length < 8) {
      setMessage('Password must contain at least 8 characters.')
      return
    }

    if (form.skills.length === 0) {
      setMessage('Please select at least one skill.')
      return
    }

    setLoading(true)

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/students/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            fullName: form.fullName.trim(),
            email: form.email.trim(),
            password: form.password,
            department: form.department,
            studyYear: Number(form.studyYear),
            skills: form.skills
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed.')
      }

      setSuccess(true)
      setMessage(
        `Registration successful! Welcome, ${data.fullName}. Your skills have been submitted.`
      )

      setForm({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        department: 'Computer Science',
        studyYear: '3',
        skills: []
      })
    } catch (error) {
      setMessage(
        error.message === 'Failed to fetch'
          ? 'Cannot connect to the backend. Please start Spring Boot on port 8080.'
          : error.message
      )
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '11px',
    marginTop: '7px',
    border: '1px solid #cbd5e1',
    borderRadius: '7px',
    boxSizing: 'border-box',
    fontSize: '15px'
  }

  const labelStyle = {
    display: 'block',
    marginTop: '18px',
    fontWeight: '600',
    color: '#334155'
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f1f5f9',
        padding: '35px 15px',
        fontFamily: 'Arial, sans-serif'
      }}
    >
      <div
        style={{
          maxWidth: '600px',
          margin: '0 auto',
          background: 'white',
          padding: '30px',
          borderRadius: '16px',
          boxShadow: '0 8px 25px rgba(0,0,0,0.08)'
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ color: '#2563eb', marginBottom: '8px' }}>
            SkillBridge
          </h1>

          <h2 style={{ marginTop: '0', color: '#1e293b' }}>
            Student Registration
          </h2>

          <p style={{ color: '#64748b' }}>
            Create your account to discover skills and internships.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <label style={labelStyle} htmlFor="fullName">
            Full Name *
          </label>

          <input
            id="fullName"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            style={inputStyle}
            maxLength={100}
            required
          />

          <label style={labelStyle} htmlFor="email">
            Email Address *
          </label>

          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your college email"
            style={inputStyle}
            required
          />

          <label style={labelStyle} htmlFor="password">
            Password *
          </label>

          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="At least 8 characters"
            minLength={8}
            style={inputStyle}
            required
          />

          <label style={labelStyle} htmlFor="confirmPassword">
            Confirm Password *
          </label>

          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Enter your password again"
            style={inputStyle}
            required
          />

          <label style={labelStyle} htmlFor="department">
            Department *
          </label>

          <select
            id="department"
            name="department"
            value={form.department}
            onChange={handleChange}
            style={inputStyle}
            required
          >
            <option value="Computer Science">
              Computer Science
            </option>
            <option value="Information Technology">
              Information Technology
            </option>
            <option value="Electronics and Communication">
              Electronics and Communication
            </option>
            <option value="Electrical Engineering">
              Electrical Engineering
            </option>
            <option value="Mechanical Engineering">
              Mechanical Engineering
            </option>
            <option value="Civil Engineering">
              Civil Engineering
            </option>
            <option value="Other">Other</option>
          </select>

          <label style={labelStyle} htmlFor="studyYear">
            Current Study Year *
          </label>

          <select
            id="studyYear"
            name="studyYear"
            value={form.studyYear}
            onChange={handleChange}
            style={inputStyle}
            required
          >
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>

          <fieldset
            style={{
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              marginTop: '22px',
              padding: '15px'
            }}
          >
            <legend style={{ fontWeight: '600', padding: '0 5px' }}>
              Skills *
            </legend>

            <p style={{ color: '#64748b', fontSize: '14px' }}>
              Select all the skills you know.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns:
                  'repeat(auto-fit, minmax(170px, 1fr))',
                gap: '12px'
              }}
            >
              {skillOptions.map(skill => (
                <label
                  key={skill}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={form.skills.includes(skill)}
                    onChange={() => handleSkillChange(skill)}
                  />
                  {skill}
                </label>
              ))}
            </div>

            <p style={{ color: '#2563eb', fontSize: '14px' }}>
              Selected skills: {form.skills.length}
            </p>
          </fieldset>

          {message && (
            <p
              role="status"
              style={{
                marginTop: '18px',
                padding: '12px',
                borderRadius: '7px',
                background: success ? '#dcfce7' : '#fee2e2',
                color: success ? '#166534' : '#991b1b'
              }}
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              marginTop: '24px',
              padding: '14px',
              background: loading ? '#94a3b8' : '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          Already have an account? <a href="/login">Login</a>
        </p>

        <p style={{ textAlign: 'center' }}>
          <a href="/">Back to Home</a>
        </p>
      </div>
    </div>
  )
}

export default Register

