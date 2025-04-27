import type React from "react"
import { Link } from "react-router-dom"
import { LayoutDashboard, User, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`
      fixed inset-y-0 left-0 z-50 w-64 bg-white border-r shadow-sm transform
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
      transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto
    `}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-bold">App Name</h2>
        <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden">
          <X className="h-5 w-5" />
        </Button>
      </div>

      <nav className="p-2">
        <ul className="space-y-2">
          <li>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link to="/dashboard" onClick={onClose}>
                <LayoutDashboard className="mr-2 h-5 w-5" />
                Dashboard
              </Link>
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link to="/profile" onClick={onClose}>
                <User className="mr-2 h-5 w-5" />
                Profile
              </Link>
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar
