import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Menu, User } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface HeaderProps {
  toggleSidebar: () => void
  user: { username: string } | null
}

const Header= ({ toggleSidebar, user }: HeaderProps) => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    // Replace with your authentication logic
    navigate("/login")
  }

  return (
    <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-white border-b shadow-sm">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2">
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold">Dashboard</h1>
      </div>

      {user && (
        <div className="relative">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>{user.username}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => navigate("/profile")}>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  )
}

export default Header