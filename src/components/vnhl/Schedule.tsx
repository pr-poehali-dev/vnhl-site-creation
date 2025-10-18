import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Game {
  date: string;
  time: string;
  home: string;
  away: string;
  status: string;
}

interface ScheduleProps {
  games: Game[];
}

const Schedule = ({ games }: ScheduleProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="Calendar" size={24} className="text-primary" />
          Предстоящие матчи
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {games.map((game, idx) => (
            <div
              key={idx}
              className="bg-muted/30 rounded-lg p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="text-center min-w-[80px]">
                  <div className="text-sm font-semibold">{game.date}</div>
                  <div className="text-xs text-muted-foreground">{game.time}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold">{game.home}</span>
                  <Icon name="Swords" size={18} className="text-muted-foreground" />
                  <span className="font-semibold">{game.away}</span>
                </div>
              </div>
              <Badge variant="outline">{game.status}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Schedule;
