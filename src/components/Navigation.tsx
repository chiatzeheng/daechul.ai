import React from 'react';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Home } from 'lucide-react';

export default function NavigationMenuComponent() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-gray-700 text-gray-100 hover:bg-gray-700">Menu</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] bg-gray-800 rounded-md shadow-lg">
                            <li className="row-span-3">
                                <NavigationMenuLink asChild>
                                    <a
                                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-gray-700 to-gray-600 p-6 no-underline outline-none focus:shadow-md"
                                        href="/"
                                    >
                                        <Home className="h-6 w-6 text-gray-100" />
                                        <div className="mb-2 mt-4 text-lg font-medium text-gray-100">
                                            Home
                                        </div>
                                        <p className="text-sm leading-tight text-gray-300">
                                            Return to the dashboard
                                        </p>
                                    </a>
                                </NavigationMenuLink>
                            </li>
                            <li>
                                <NavigationMenuLink asChild>
                                    <a
                                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-700 hover:text-gray-100"
                                        href="/loans"
                                    >
                                        <div className="text-sm font-medium leading-none text-gray-100">Loans</div>
                                        <p className="line-clamp-2 text-sm leading-snug text-gray-300">
                                            View and manage your loans
                                        </p>
                                    </a>
                                </NavigationMenuLink>
                            </li>
                            <li>
                                <NavigationMenuLink asChild>
                                    <a
                                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-700 hover:text-gray-100"
                                        href="/apply"
                                    >
                                        <div className="text-sm font-medium leading-none text-gray-100">Apply</div>
                                        <p className="line-clamp-2 text-sm leading-snug text-gray-300">
                                            Apply for a new loan
                                        </p>
                                    </a>
                                </NavigationMenuLink>
                            </li>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}