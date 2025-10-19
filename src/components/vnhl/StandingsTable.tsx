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
    <div className="w-full min-w-[600px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-8 md:w-12 text-xs md:text-sm">#</TableHead>
            <TableHead className="text-xs md:text-sm">Команда</TableHead>
            <TableHead className="text-center text-xs md:text-sm">И</TableHead>
            <TableHead className="text-center text-xs md:text-sm">В</TableHead>
            <TableHead className="text-center text-xs md:text-sm">П</TableHead>
            <TableHead className="text-center font-bold text-xs md:text-sm">О</TableHead>
            <TableHead className="text-center text-xs md:text-sm">Плей-Офф</TableHead>
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
              <TableCell className="font-medium text-xs md:text-sm">{team.pos}</TableCell>
              <TableCell className="font-semibold flex items-center gap-1 md:gap-2 text-xs md:text-sm">
                {isAdmin && <Icon name="GripVertical" size={14} className="text-muted-foreground md:w-4 md:h-4" />}
                <span className="truncate max-w-[120px] md:max-w-none">{team.team}</span>
              </TableCell>
              <TableCell className="text-center text-xs md:text-sm">{team.games}</TableCell>
              <TableCell className="text-center text-green-400 text-xs md:text-sm">{team.wins}</TableCell>
              <TableCell className="text-center text-red-400 text-xs md:text-sm">{team.losses}</TableCell>
              <TableCell className="text-center font-bold text-primary text-xs md:text-sm">{team.points}</TableCell>
              <TableCell className="text-center">
                <Badge variant={team.streak.startsWith('W') ? 'default' : 'secondary'} className="text-[10px] md:text-xs px-1 md:px-2">
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