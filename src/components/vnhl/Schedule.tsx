import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { useState } from 'react';
import { toast } from 'sonner';

interface Game {
  date: string;
  time: string;
  home: string;
  away: string;
  status: string;
}

interface EmptyMessage {
  title: string;
  subtitle: string;
}

interface ScheduleProps {
  games: Game[];
  isAdmin?: boolean;
  emptyMessage: EmptyMessage;
  onUpdateEmptyMessage: (message: EmptyMessage) => void;
}

const Schedule = ({ games, isAdmin = false, emptyMessage, onUpdateEmptyMessage }: ScheduleProps) => {
  const [isEditMessageOpen, setIsEditMessageOpen] = useState(false);
  const [tempMessage, setTempMessage] = useState(emptyMessage);
  if (!games || games.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center relative">
          {isAdmin && (
            <Dialog open={isEditMessageOpen} onOpenChange={setIsEditMessageOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-4 right-4"
                  onClick={() => {
                    setTempMessage(emptyMessage);
                    setIsEditMessageOpen(true);
                  }}
                >
                  <Icon name="Pencil" size={16} />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Редактировать сообщение</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Заголовок</Label>
                    <Input
                      value={tempMessage.title}
                      onChange={(e) => setTempMessage({ ...tempMessage, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Подзаголовок</Label>
                    <Input
                      value={tempMessage.subtitle}
                      onChange={(e) => setTempMessage({ ...tempMessage, subtitle: e.target.value })}
                    />
                  </div>
                  <Button
                    onClick={() => {
                      onUpdateEmptyMessage(tempMessage);
                      setIsEditMessageOpen(false);
                      toast.success('Сообщение обновлено');
                    }}
                    className="w-full"
                  >
                    Сохранить
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
          <Icon name="Calendar" size={64} className="text-muted-foreground/50 mb-4 mx-auto" />
          <h3 className="text-2xl font-bold mb-2">{emptyMessage.title}</h3>
          <p className="text-muted-foreground text-lg">{emptyMessage.subtitle}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
          <Icon name="Calendar" size={20} className="text-primary md:w-6 md:h-6" />
          <span className="hidden sm:inline">Предстоящие матчи</span>
          <span className="sm:hidden">Матчи</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {games.map((game, idx) => (
            <div
              key={idx}
              className="bg-muted/30 rounded-lg p-3 md:p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:justify-between hover:bg-muted/50 transition-colors"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <div className="text-center sm:min-w-[80px]">
                  <div className="text-xs md:text-sm font-semibold">{game.date}</div>
                  <div className="text-xs text-muted-foreground">{game.time}</div>
                </div>
                <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                  <span className="font-semibold text-xs md:text-sm">{game.home}</span>
                  <Icon name="Swords" size={16} className="text-muted-foreground flex-shrink-0" />
                  <span className="font-semibold text-xs md:text-sm">{game.away}</span>
                </div>
              </div>
              <Badge variant="outline" className="text-xs self-start sm:self-center">{game.status}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Schedule;