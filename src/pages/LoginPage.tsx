import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Fingerprint } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QuestLogo } from "@/components/QuestLogo";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-secondary relative overflow-hidden items-center justify-center">
        {/* Geometric pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="hsl(44,80%,46%)" strokeWidth="0.5" />
              </pattern>
              <pattern id="diamonds" width="120" height="120" patternUnits="userSpaceOnUse">
                <path d="M60 0 L120 60 L60 120 L0 60Z" fill="none" stroke="hsl(44,80%,46%)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <rect width="100%" height="100%" fill="url(#diamonds)" />
          </svg>
        </div>

        <div className="relative z-10 text-center px-12">
          <QuestLogo size="lg" className="justify-center mb-8 text-secondary-foreground [&_span]:text-secondary-foreground [&_.text-primary]:text-primary" />
          <p className="text-primary text-xl font-medium mb-4">
            Plataforma inteligente para auditores
          </p>
          <p className="text-sidebar-foreground text-sm max-w-md mx-auto leading-relaxed">
            Gestiona órdenes de cumplimiento, registra hallazgos con IA y genera informes profesionales en minutos.
          </p>
          <div className="mt-12 flex gap-8 justify-center text-sidebar-foreground">
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-primary">500+</div>
              <div className="text-xs mt-1">Auditorías</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-primary">98%</div>
              <div className="text-xs mt-1">OC a tiempo</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-primary">3x</div>
              <div className="text-xs mt-1">Más rápido</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden">
            <QuestLogo size="default" className="justify-center mb-2" />
          </div>
          <div className="text-center lg:text-left">
            <h1 className="text-2xl font-display font-bold text-foreground">Iniciar Sesión</h1>
            <p className="text-muted-foreground mt-1 text-sm">Ingresa tus credenciales para acceder a la plataforma</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="auditor@questaudit.co"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Contraseña</Label>
                <button type="button" className="text-xs text-primary hover:underline">
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="h-11 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button type="submit" variant="brand" className="w-full h-11 text-base">
              Iniciar Sesión
            </Button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-background px-3 text-muted-foreground">o continuar con</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button type="button" variant="outline" className="flex-1 h-11">
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Google
              </Button>
              <Button type="button" variant="outline" className="h-11 px-4" title="Disponible en app móvil">
                <Fingerprint size={18} />
              </Button>
            </div>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            ¿No tienes una cuenta?{" "}
            <button className="text-primary font-medium hover:underline">
              Registrarse como auditor independiente
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
