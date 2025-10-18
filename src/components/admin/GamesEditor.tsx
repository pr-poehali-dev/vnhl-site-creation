import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

interface Game {
  date: string;
  time: string;
  home: string;
  away: string;
  status: string;
}

interface GamesEditorProps {
  upcomingGames: Game[];
  onUpdateGame: (index: number, updatedGame: Game) => void;
  onDeleteGame: (index: number) => void;
  onAddGame: (game: Game) => void;
}

const GamesEditor = ({
  upcomingGames,
  onUpdateGame,
  onDeleteGame,
  onAddGame,
}: GamesEditorProps) => {
  const [editGame, setEditGame] = useState<any>(null);
  const [newGame, setNewGame] = useState({
    date: '',
    time: '',
    home: '',
    away: '',
    status: '',
  });

  const handleEditGame = (game: Game, index: number) => {
    setEditGame({ ...game, index });
  };

  const handleSaveGame = () => {
    if (editGame) {
      onUpdateGame(editGame.index, editGame);
      setEditGame(null);
    }
  };

  const handleAddNewGame = () => {
    onAddGame(newGame);
    setNewGame({
      date: '',
      time: '',
      home: '',
      away: '',
      status: '',
    });
    toast.success('Матч добавлен');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="Calendar" size={24} className="text-primary" />
          Календарь матчей
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Дата</TableHead>
              <TableHead>Время</TableHead>
              <TableHead>Хозяева</TableHead>
              <TableHead>Гости</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {upcomingGames.map((game, index) => (
              <TableRow key={index}>
                <TableCell>{game.date}</TableCell>
                <TableCell>{game.time}</TableCell>
                <TableCell>{game.home}</TableCell>
                <TableCell>{game.away}</TableCell>
                <TableCell>{game.status}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditGame(game, index)}
                        >
                          <Icon name="Pencil" size={16} />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Редактировать матч</DialogTitle>
                        </DialogHeader>
                        {editGame && (
                          <div className="space-y-4">
                            <div>
                              <Label>Дата</Label>
                              <Input
                                value={editGame.date}
                                onChange={(e) =>
                                  setEditGame({ ...editGame, date: e.target.value })
                                }
                              />
                            </div>
                            <div>
                              <Label>Время</Label>
                              <Input
                                value={editGame.time}
                                onChange={(e) =>
                                  setEditGame({ ...editGame, time: e.target.value })
                                }
                              />
                            </div>
                            <div>
                              <Label>Хозяева</Label>
                              <Input
                                value={editGame.home}
                                onChange={(e) =>
                                  setEditGame({ ...editGame, home: e.target.value })
                                }
                              />
                            </div>
                            <div>
                              <Label>Гости</Label>
                              <Input
                                value={editGame.away}
                                onChange={(e) =>
                                  setEditGame({ ...editGame, away: e.target.value })
                                }
                              />
                            </div>
                            <div>
                              <Label>Статус</Label>
                              <Input
                                value={editGame.status}
                                onChange={(e) =>
                                  setEditGame({ ...editGame, status: e.target.value })
                                }
                              />
                            </div>
                            <Button onClick={handleSaveGame} className="w-full">
                              Сохранить
                            </Button>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onDeleteGame(index)}
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-4 w-full" variant="outline">
              <Icon name="Plus" size={18} className="mr-2" />
              Добавить матч
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Добавить матч</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Дата</Label>
                <Input
                  value={newGame.date}
                  onChange={(e) => setNewGame({ ...newGame, date: e.target.value })}
                  placeholder="19 окт"
                />
              </div>
              <div>
                <Label>Время</Label>
                <Input
                  value={newGame.time}
                  onChange={(e) => setNewGame({ ...newGame, time: e.target.value })}
                  placeholder="19:00"
                />
              </div>
              <div>
                <Label>Хозяева</Label>
                <Input
                  value={newGame.home}
                  onChange={(e) => setNewGame({ ...newGame, home: e.target.value })}
                  placeholder="Boston Bruins"
                />
              </div>
              <div>
                <Label>Гости</Label>
                <Input
                  value={newGame.away}
                  onChange={(e) => setNewGame({ ...newGame, away: e.target.value })}
                  placeholder="Toronto Maple Leafs"
                />
              </div>
              <div>
                <Label>Статус</Label>
                <Input
                  value={newGame.status}
                  onChange={(e) => setNewGame({ ...newGame, status: e.target.value })}
                  placeholder="Скоро"
                />
              </div>
              <Button onClick={handleAddNewGame} className="w-full">
                Добавить
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default GamesEditor;
