'use client'

import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type User = {
  id:number,
  username: string;
  password: string;
  name: string;
  address: string;
  contactNumber: string;
};

export function AdminTableComponent() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:6969/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: User[] = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">User Management</h1>
      <Table>
        <TableCaption>A list of users and their details.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Password</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Contact Number</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.password}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.address}</TableCell>
              <TableCell>{user.contactNumber}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
