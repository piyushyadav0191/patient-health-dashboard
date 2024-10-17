import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
import {
  LayoutDashboard,
  Menu,
  LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import PatientList from "./components/PatientList";
import PatientDetail from "./components/PatientDetail";
import PriorAuthorizationForm from "./components/PriorAuthorizationForm";

function Sidebar({ className }: { className?: string }) {
  const location = useLocation();

  const NavItem = ({ to, icon: Icon, children }: {
    to: string;
    icon: LucideIcon;
    children: React.ReactNode;
  }) => (
    <Link to={to}>
      <Button
        variant={location.pathname === to ? "secondary" : "ghost"}
        className="w-full justify-start"
      >
        <Icon className="mr-2 h-4 w-4" />
        {children}
      </Button>
    </Link>
  );

  return (
    <div className={`pb-12 ${className}`}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Health Dashboard
          </h2>
          <div className="space-y-1">
            <NavItem to="/" icon={LayoutDashboard}>
              Dashboard
            </NavItem>
           
            
          </div>
        </div>
      </div>
    </div>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center px-4 h-16 bg-background border-b">
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
          </SheetTrigger>
          <Link to="/">
          <h1 className="ml-4 text-xl font-semibold">
            Patient Health Dashboard
          </h1>
          </Link>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <ScrollArea className="h-full">{children}</ScrollArea>
        </main>
      </div>
        <SheetContent side="left" className="p-0 w-[300px]">
          <Sidebar />
        </SheetContent>
      </Sheet>


      <aside className="hidden lg:block w-64 border-r bg-background">
        <Sidebar />
      </aside>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<PatientList />} />
          <Route path="/patient/:id" element={<PatientDetail />} />
          <Route path="/authorize/:id" element={<PriorAuthorizationForm />} />
        </Routes>
      </Layout>
    </Router>
  );
}
