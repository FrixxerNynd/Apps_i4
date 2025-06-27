<<<<<<< HEAD
=======
"use client"

import type React from "react"

>>>>>>> 9fb3c1d (Commit Actualizacion frontend)
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle, AlertCircle, Eye, EyeOff } from "lucide-react"

interface Role {
  _id: string
  type: string
}

interface FormData {
  name: string
  email: string
  password: string
  phone: string
  roles: string[]
}

interface FormErrors {
  name?: string
  email?: string
  password?: string
  phone?: string
  roles?: string
  general?: string
}

export default function UserForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    phone: "",
    roles: [],
  })

  const [availableRoles, setAvailableRoles] = useState<Role[]>([])
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await fetch("http://192.168.1.126:4000/app/roles")
        const data = await res.json()
<<<<<<< HEAD
        setAvailableRoles(data.roles)
=======
        setAvailableRoles(data)
>>>>>>> 9fb3c1d (Commit Actualizacion frontend)
      } catch (err) {
        console.error("Error al obtener roles:", err)
      }
    }
    fetchRoles()
  }, [])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
<<<<<<< HEAD
    if (!formData.name.trim()) newErrors.name = "El nombre es requerido"
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Correo inválido"
    if (formData.password.length < 6) newErrors.password = "Mínimo 6 caracteres"
    if (!formData.phone.match(/^[+]?[1-9][\d]{0,15}$/)) newErrors.phone = "Teléfono inválido"
    if (formData.roles.length === 0) newErrors.roles = "Selecciona al menos un rol"
=======

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "El nombre debe tener al menos 2 caracteres"
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email) {
      newErrors.email = "El correo es requerido"
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Ingresa un correo válido"
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "La contraseña es requerida"
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres"
    }

    // Phone validation
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
    if (!formData.phone) {
      newErrors.phone = "El teléfono es requerido"
    } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Ingresa un número de teléfono válido"
    }

    // Roles validation
    if (formData.roles.length === 0) {
      newErrors.roles = "Selecciona al menos un rol"
    }

>>>>>>> 9fb3c1d (Commit Actualizacion frontend)
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
<<<<<<< HEAD
    if (errors[name as keyof FormErrors]) setErrors((prev) => ({ ...prev, [name]: undefined }))
=======

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
>>>>>>> 9fb3c1d (Commit Actualizacion frontend)
  }

  const handleRoleChange = (roleId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      roles: checked ? [...prev.roles, roleId] : prev.roles.filter((r) => r !== roleId),
    }))
<<<<<<< HEAD
    if (errors.roles) setErrors((prev) => ({ ...prev, roles: undefined }))
=======

    // Clear roles error when user selects a role
    if (errors.roles) {
      setErrors((prev) => ({ ...prev, roles: undefined }))
    }
>>>>>>> 9fb3c1d (Commit Actualizacion frontend)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
<<<<<<< HEAD
    if (!validateForm()) return
    setIsLoading(true)
=======

    if (!validateForm()) return

    setIsLoading(true)
    setErrors({})

>>>>>>> 9fb3c1d (Commit Actualizacion frontend)
    try {
      const res = await fetch("http://192.168.1.126:4000/app/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
<<<<<<< HEAD
      if (!res.ok) throw new Error("Error al registrar usuario")
      setIsSuccess(true)
=======

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || "Error al registrar usuario")
      }

      const result = await res.json()
      console.log("Usuario registrado:", result)

      setIsSuccess(true)

      // Reset form after successful registration
>>>>>>> 9fb3c1d (Commit Actualizacion frontend)
      setTimeout(() => {
        setFormData({ name: "", email: "", password: "", phone: "", roles: [] })
        setIsSuccess(false)
      }, 3000)
    } catch (err: any) {
<<<<<<< HEAD
      setErrors({ general: err.message })
=======
      console.error("Error:", err)
      setErrors({ general: err.message || "Error al registrar usuario" })
>>>>>>> 9fb3c1d (Commit Actualizacion frontend)
    } finally {
      setIsLoading(false)
    }
  }

<<<<<<< HEAD
  return isSuccess ? (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="text-center pt-6">
          <CheckCircle className="mx-auto text-green-500 h-16 w-16 mb-4" />
          <h2 className="text-2xl font-bold">Registro Exitoso</h2>
        </CardContent>
      </Card>
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-blue-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Registro de Usuario</CardTitle>
          <CardDescription>Completa todos los campos</CardDescription>
=======
  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, label: "" }
    if (password.length < 6) return { strength: 1, label: "Débil" }
    if (password.length < 10) return { strength: 2, label: "Media" }
    return { strength: 3, label: "Fuerte" }
  }

  const passwordStrength = getPasswordStrength(formData.password)

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
              <h2 className="text-2xl font-bold text-green-700 mb-2">¡Registro Exitoso!</h2>
              <p className="text-gray-600 mb-4">
                Tu cuenta ha sido creada correctamente. Serás redirigido en unos segundos.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Registro de Usuario</CardTitle>
          <CardDescription className="text-center">Completa todos los campos para crear tu cuenta</CardDescription>
>>>>>>> 9fb3c1d (Commit Actualizacion frontend)
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.general && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.general}</AlertDescription>
              </Alert>
            )}
<<<<<<< HEAD
            <div>
              <Label htmlFor="name">Nombre</Label>
              <Input name="name" value={formData.name} onChange={handleInputChange} />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>
            <div>
              <Label htmlFor="email">Correo</Label>
              <Input name="email" type="email" value={formData.email} onChange={handleInputChange} />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>
            <div>
              <Label htmlFor="password">Contraseña</Label>
              <Input name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleInputChange} />
              <Button type="button" variant="ghost" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div>
            <div>
              <Label htmlFor="phone">Teléfono</Label>
              <Input name="phone" value={formData.phone} onChange={handleInputChange} />
              {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
            </div>
            <div>
              <Label>Roles</Label>
              <div className="space-y-2">
                {availableRoles.map((role) => (
                  <div key={role._id} className="flex items-center space-x-2">
=======

            <div className="space-y-2">
              <Label htmlFor="name">Nombre completo</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Ingresa tu nombre completo"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="correo@ejemplo.com"
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Mínimo 6 caracteres"
                  className={errors.password ? "border-red-500 pr-10" : "pr-10"}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {formData.password && (
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        passwordStrength.strength === 1
                          ? "bg-red-500 w-1/3"
                          : passwordStrength.strength === 2
                            ? "bg-yellow-500 w-2/3"
                            : passwordStrength.strength === 3
                              ? "bg-green-500 w-full"
                              : "w-0"
                      }`}
                    />
                  </div>
                  <span className="text-xs text-gray-600">{passwordStrength.label}</span>
                </div>
              )}
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+1234567890"
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
            </div>

            <div className="space-y-3">
              <Label>Roles de usuario</Label>
              <div className="space-y-3">
                {availableRoles.map((role) => (
                  <div key={role._id} className="flex items-start space-x-3">
>>>>>>> 9fb3c1d (Commit Actualizacion frontend)
                    <Checkbox
                      id={role._id}
                      checked={formData.roles.includes(role._id)}
                      onCheckedChange={(checked) => handleRoleChange(role._id, checked as boolean)}
                    />
<<<<<<< HEAD
                    <Label htmlFor={role._id}>{role.type}</Label>
=======
                    <div className="grid gap-1.5 leading-none">
                      <Label
                        htmlFor={role._id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {role.type}
                      </Label>
                    </div>
>>>>>>> 9fb3c1d (Commit Actualizacion frontend)
                  </div>
                ))}
              </div>
              {errors.roles && <p className="text-sm text-red-500">{errors.roles}</p>}
            </div>
<<<<<<< HEAD
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Crear Cuenta"}
=======

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Registrando...
                </>
              ) : (
                "Crear Cuenta"
              )}
>>>>>>> 9fb3c1d (Commit Actualizacion frontend)
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
