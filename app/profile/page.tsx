'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/password-input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Reveal } from '@/components/reveal'
import { Camera, CheckCircle, AlertCircle, Trash2, ShieldAlert } from 'lucide-react'
import { deleteAccount, getCurrentUser, updateUser, type User } from '@/lib/storage'

const CAMPUSES = ['ZCAS', 'UNZA', 'Copperbelt University', 'Mulungushi University', 'ZAOU', 'Other']

export default function ProfilePage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [user, setUser] = useState<User | null>(null)
  const [authChecked, setAuthChecked] = useState(false)
  const [name, setName] = useState('')
  const [campus, setCampus] = useState('')
  const [avatar, setAvatar] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [savedMsg, setSavedMsg] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState('')
  const [showDelete, setShowDelete] = useState(false)

  useEffect(() => {
    const u = getCurrentUser()
    setUser(u)
    setAuthChecked(true)
    if (!u) {
      router.replace('/login')
      return
    }
    setName(u.name)
    setCampus(u.campus)
    setAvatar(u.avatar)
    setPhone(u.phone ?? '')
  }, [router])

  if (!authChecked || !user) {
    return (
      <>
        <Navbar />
        <main className="bg-background min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground pulse-soft">Loading your profile…</p>
        </main>
        <Footer />
      </>
    )
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg(null)
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please choose an image file.')
      return
    }
    if (file.size > 1.5 * 1024 * 1024) {
      setErrorMsg('Image is too large (max 1.5 MB).')
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') setAvatar(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveAvatar = () => setAvatar('')

  const handleDeleteAccount = () => {
    if (!user) return
    deleteAccount(user.id)
    router.push('/')
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)
    setSavedMsg(null)

    if (!name.trim()) {
      setErrorMsg('Name cannot be empty.')
      return
    }

    const patch: Partial<User> = {
      name: name.trim(),
      campus,
      avatar,
      phone: phone.trim(),
    }

    if (password || confirmPassword) {
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match.')
        return
      }
      if (password.length < 4) {
        setErrorMsg('Password is too short.')
        return
      }
      patch.password = password
    }

    const updated = updateUser(user.id, patch)
    if (!updated) {
      setErrorMsg('Could not update profile.')
      return
    }
    setUser(updated)
    setPassword('')
    setConfirmPassword('')
    setSavedMsg('Profile updated.')
    setTimeout(() => setSavedMsg(null), 2500)
  }

  const initial = (name || user.name).charAt(0).toUpperCase() || '?'

  return (
    <>
      <Navbar />

      <main className="bg-background min-h-screen">
        <section className="relative bg-card border-b border-border py-10 px-4 overflow-hidden">
          <div className="absolute inset-0 glow-radial pointer-events-none" />
          <div className="relative max-w-3xl mx-auto fade-in-up">
            <Link
              href="/dashboard"
              className="text-primary hover:text-[#083843] font-medium text-sm mb-4 inline-block"
            >
              ← Back to Dashboard
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Your Profile</h1>
            <p className="text-muted-foreground">Update your details, photo, and password.</p>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-4 py-12">
          <form onSubmit={handleSave} className="space-y-6">
            {/* Avatar */}
            <Reveal>
              <div className="bg-card rounded-[12px] border border-border p-6 shadow-[0_1px_3px_rgba(15,23,42,0.04),0_2px_8px_-4px_rgba(15,23,42,0.05)]">
                <h2 className="text-lg font-semibold text-foreground mb-4">Profile picture</h2>
                <div className="flex items-center gap-6">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="Profile preview"
                      className="w-24 h-24 rounded-full object-cover ring-2 ring-card shadow-md"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-[#083843] text-white flex items-center justify-center text-3xl font-bold shadow-md">
                      {initial}
                    </div>
                  )}
                  <div className="flex flex-col gap-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <Button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-primary text-white hover:bg-[#083843] rounded-[8px] gap-2"
                    >
                      <Camera className="w-4 h-4" />
                      {avatar ? 'Change photo' : 'Upload photo'}
                    </Button>
                    {avatar && (
                      <Button
                        type="button"
                        onClick={handleRemoveAvatar}
                        variant="outline"
                        className="border-red-200 text-red-600 hover:bg-red-50 rounded-[8px] gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </Button>
                    )}
                    <p className="text-xs text-muted-foreground">PNG or JPG, max 1.5 MB.</p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Details */}
            <Reveal delay={80}>
              <div className="bg-card rounded-[12px] border border-border p-6 shadow-[0_1px_3px_rgba(15,23,42,0.04),0_2px_8px_-4px_rgba(15,23,42,0.05)] space-y-5">
                <h2 className="text-lg font-semibold text-foreground">Account details</h2>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Full name</label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-secondary border-border rounded-[8px]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
                  <Input
                    value={user.email}
                    disabled
                    className="bg-secondary border-border rounded-[8px] opacity-60 cursor-not-allowed"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Email cannot be changed.</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Phone number</label>
                  <Input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+260 9XX XXX XXX"
                    className="bg-secondary border-border rounded-[8px]"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Shown to students who book your gigs (optional).
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Campus</label>
                  <Select value={campus} onValueChange={setCampus}>
                    <SelectTrigger className="bg-secondary border-border rounded-[8px]">
                      <SelectValue placeholder="Select campus" />
                    </SelectTrigger>
                    <SelectContent>
                      {CAMPUSES.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Reveal>

            {/* Password */}
            <Reveal delay={160}>
              <div className="bg-card rounded-[12px] border border-border p-6 shadow-[0_1px_3px_rgba(15,23,42,0.04),0_2px_8px_-4px_rgba(15,23,42,0.05)] space-y-5">
                <h2 className="text-lg font-semibold text-foreground">Change password</h2>
                <p className="text-sm text-muted-foreground -mt-2">Leave blank to keep your current password.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">New password</label>
                    <PasswordInput
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••"
                      className="bg-secondary border-border rounded-[8px]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Confirm</label>
                    <PasswordInput
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••"
                      className="bg-secondary border-border rounded-[8px]"
                    />
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Danger zone */}
            <Reveal delay={240}>
              <div className="bg-red-50/50 rounded-[12px] border border-red-200 p-6 shadow-[0_1px_3px_rgba(15,23,42,0.04),0_2px_8px_-4px_rgba(220,38,38,0.10)]">
                <div className="flex items-start gap-3 mb-4">
                  <ShieldAlert className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h2 className="text-lg font-semibold text-red-900">Delete account</h2>
                    <p className="text-sm text-red-800/80 mt-1">
                      Permanently remove your account, your posted gigs, and all your bookings.
                      This cannot be undone.
                    </p>
                  </div>
                </div>

                {!showDelete ? (
                  <Button
                    type="button"
                    onClick={() => setShowDelete(true)}
                    variant="outline"
                    className="border-red-300 text-red-700 hover:bg-red-100 rounded-[8px] gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete my account
                  </Button>
                ) : (
                  <div className="space-y-3 bg-white border border-red-200 rounded-[8px] p-4">
                    <p className="text-sm text-foreground">
                      To confirm, type <span className="font-mono font-semibold">DELETE</span> below.
                    </p>
                    <Input
                      value={deleteConfirm}
                      onChange={(e) => setDeleteConfirm(e.target.value)}
                      placeholder="DELETE"
                      className="bg-white border-red-200 rounded-[8px]"
                    />
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        onClick={handleDeleteAccount}
                        disabled={deleteConfirm !== 'DELETE'}
                        className="bg-red-600 text-white hover:bg-red-700 rounded-[8px] gap-2 disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                        Permanently delete
                      </Button>
                      <Button
                        type="button"
                        onClick={() => {
                          setShowDelete(false)
                          setDeleteConfirm('')
                        }}
                        variant="outline"
                        className="border-border text-foreground hover:bg-secondary rounded-[8px]"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Reveal>

            {errorMsg && (
              <div className="bg-red-50 border border-red-200 rounded-[8px] p-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">{errorMsg}</p>
              </div>
            )}
            {savedMsg && (
              <div className="bg-green-50 border border-green-200 rounded-[8px] p-4 flex gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-green-800">{savedMsg}</p>
              </div>
            )}

            <div className="flex gap-3">
              <Button
                type="submit"
                className="btn-sheen bg-primary text-white hover:bg-[#083843] rounded-[10px] px-8 py-6 text-base font-medium shadow-[0_8px_24px_-12px_rgba(13,79,92,0.5)]"
              >
                Save changes
              </Button>
              <Link href="/dashboard">
                <Button
                  type="button"
                  variant="outline"
                  className="border-border text-foreground hover:bg-secondary rounded-[10px] px-8 py-6 text-base font-medium"
                >
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </>
  )
}
