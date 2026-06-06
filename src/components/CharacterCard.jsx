import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function CharacterCard({ character }) {
  return (
    <Card className="group overflow-hidden border-orange-100 bg-white/95 shadow-dragon transition duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-xl">
      <div className="flex h-64 items-end justify-center bg-gradient-to-br from-orange-100 via-sky-100 to-blue-200 p-5">
        <img
          src={character.image}
          alt={character.name}
          className="h-full max-w-full object-contain drop-shadow-2xl transition duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-xl text-slate-950">{character.name}</CardTitle>
          <Badge className="bg-orange-500 text-white hover:bg-orange-600">
            {character.race || "Unknown"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 text-sm text-slate-700">
        <div className="rounded-md bg-slate-50 p-3">
          <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Ki
          </span>
          <span className="font-bold text-blue-700">{character.ki || "No data"}</span>
        </div>
      </CardContent>

      <CardFooter>
        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
          {character.affiliation || "No affiliation"}
        </Badge>
      </CardFooter>
    </Card>
  );
}

export default CharacterCard;
