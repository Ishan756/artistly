"use client";
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Mic, Users, Calendar } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
   console.log(session)

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-purple-600 rounded-lg">
              <Mic className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Artistly</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/artists" className="text-gray-700 hover:text-purple-600 transition-colors">
              Find Artists
            </Link>
            <Link href="/onboard" className="text-gray-700 hover:text-purple-600 transition-colors">
              Join as Artist
            </Link>
            <Link href="/dashboard" className="text-gray-700 hover:text-purple-600 transition-colors">
              Dashboard
            </Link>
            {!session ? (
              <Button onClick={() => signIn("google")}>
                Sign In
              </Button>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    {session.user?.image ? (
                      <Image

                        width={32}
                        height={32}
                        src={session.user.image}
                        alt={session.user.name || "User"}
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        {session.user?.name?.[0] || "U"}
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-48">
                  <div className="flex flex-col items-center space-y-2">
                    {session.user?.image && (
                      <Image
                        width={48}
                        height={102}
                        src={session.user.image}
                        alt={session.user.name || "User"}
                        className="w-12 h-12 rounded-full"
                      />
                    )}
                    <div className="text-center">
                      <div className="font-semibold">{session.user?.name}</div>
                      <div className="text-xs text-gray-500">{session.user?.email}</div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full mt-2"
                      onClick={() => signOut()}
                    >
                      Sign Out
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>

          <div className="md:hidden">
           
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
        {/* ...mobile menu code remains unchanged... */}
      </div>
    </nav>
  );
}