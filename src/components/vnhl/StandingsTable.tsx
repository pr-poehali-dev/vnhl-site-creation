import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Team {
  pos: number;
  team: string;
  games: number;
  wins: number;
  losses: number;
  otl: number;
  points: number;
  streak: string;
}

interface StandingsTableProps {
  teams: Team[];
  isAdmin: boolean;
  onDragStart: (index: number) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (index: number) => void;
}

const StandingsTable = ({
  teams,
  isAdmin,
  onDragStart,
  onDragOver,
  onDrop,
}: StandingsTableProps) => {
  if (!teams || teams.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Icon name="Users" size={64} className="text-muted-foreground/50 mb-4" />
        <h3 className="text-2xl font-bold mb-2">Команды ещё не выбраны</h3>
        <p className="text-muted-foreground text-lg">Ожидайте, таблица скоро появится</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">#</TableHead>
            <TableHead>Команда</TableHead>
            <TableHead className="text-center">И</TableHead>
            <TableHead className="text-center">В</TableHead>
            <TableHead className="text-center">П</TableHead>
            <TableHead className="text-center font-bold">О</TableHead>
            <TableHead className="text-center">Плей-Офф</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teams.map((team, index) => (
            <TableRow
              key={team.pos}
              draggable={isAdmin}
              onDragStart={() => onDragStart(index)}
              onDragOver={onDragOver}
              onDrop={() => onDrop(index)}
              className={`hover:bg-muted/50 transition-colors ${isAdmin ? 'cursor-move' : ''}`}
            >
              <TableCell className="font-medium">{team.pos}</TableCell>
              <TableCell className="font-semibold flex items-center gap-2">
                {isAdmin && <Icon name="GripVertical" size={16} className="text-muted-foreground" />}
                {team.team}
              </TableCell>
              <TableCell className="text-center">{team.games}</TableCell>
              <TableCell className="text-center text-green-400">{team.wins}</TableCell>
              <TableCell className="text-center text-red-400">{team.losses}</TableCell>
              <TableCell className="text-center font-bold text-primary">{team.points}</TableCell>
              <TableCell className="text-center">
                <Badge variant={team.streak.startsWith('W') ? 'default' : 'secondary'}>
                  {team.streak}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StandingsTable;