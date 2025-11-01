import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/service";

export default function CreateGroupForm() {
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      return;
    }

    try {
      const res = await api.post("/groups", { name, roomId });
      setName("");
      setRoomId("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-200">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Yangi Guruh Qo‘shish
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Guruh nomi
              </label>
              <Input
                type="text"
                placeholder="Masalan: Frontend-701"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Xona ID (ixtiyoriy)
              </label>
              <Input
                type="text"
                placeholder="Room ID (ixtiyoriy)"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-xl py-2"
            >
              Qo‘shish
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
