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

interface TeamEditorProps {
  easternTeams: Team[];
  westernTeams: Team[];
  onUpdateTeam: (conference: 'eastern' | 'western', index: number, updatedTeam: Team) => void;
  onDeleteTeam: (conference: 'eastern' | 'western', index: number) => void;
  onAddTeam: (conference: 'eastern' | 'western', team: Team) => void;
}

const TeamEditor = ({
  easternTeams,
  westernTeams,
  onUpdateTeam,
  onDeleteTeam,
  onAddTeam,
}: TeamEditorProps) => {
  const [editTeam, setEditTeam] = useState<any>(null);
  const [newTeam, setNewTeam] = useState({
    team: '',
    games: 0,
    wins: 0,
    losses: 0,
    otl: 0,
    points: 0,
    streak: '',
  });

  const handleEditTeam = (team: Team, conference: 'eastern' | 'western', index: number) => {
    setEditTeam({ ...team, conference, index });
  };

  const handleSaveTeam = () => {
    if (editTeam) {
      onUpdateTeam(editTeam.conference, editTeam.index, editTeam);
      setEditTeam(null);
    }
  };

  const handleAddNewTeam = (conference: 'eastern' | 'western') => {
    const teams = conference === 'eastern' ? easternTeams : westernTeams;
    const team = {
      pos: teams.length + 1,
      ...newTeam,
    };
    onAddTeam(conference, team);
    setNewTeam({
      team: '',
      games: 0,
      wins: 0,
      losses: 0,
      otl: 0,
      points: 0,
      streak: '',
    });
    toast.success('Команда добавлена');
  };

  const renderTeamsTable = (teams: Team[], conference: 'eastern' | 'western') => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Поз</TableHead>
          <TableHead>Команда</TableHead>
          <TableHead>И</TableHead>
          <TableHead>В</TableHead>
          <TableHead>П</TableHead>
          <TableHead>О</TableHead>
          <TableHead>Плей-Офф</TableHead>
          <TableHead>Действия</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {teams.map((team, index) => (
          <TableRow key={index}>
            <TableCell>{team.pos}</TableCell>
            <TableCell>{team.team}</TableCell>
            <TableCell>{team.games}</TableCell>
            <TableCell>{team.wins}</TableCell>
            <TableCell>{team.losses}</TableCell>
            <TableCell>{team.points}</TableCell>
            <TableCell>{team.streak}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditTeam(team, conference, index)}
                    >
                      <Icon name="Pencil" size={16} />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Редактировать команду</DialogTitle>
                    </DialogHeader>
                    {editTeam && (
                      <div className="space-y-4">
                        <div>
                          <Label>Название команды</Label>
                          <Input
                            value={editTeam.team}
                            onChange={(e) =>
                              setEditTeam({ ...editTeam, team: e.target.value })
                            }
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Игры</Label>
                            <Input
                              type="number"
                              value={editTeam.games}
                              onChange={(e) =>
                                setEditTeam({ ...editTeam, games: parseInt(e.target.value) })
                              }
                            />
                          </div>
                          <div>
                            <Label>Победы</Label>
                            <Input
                              type="number"
                              value={editTeam.wins}
                              onChange={(e) =>
                                setEditTeam({ ...editTeam, wins: parseInt(e.target.value) })
                              }
                            />
                          </div>
                          <div>
                            <Label>Поражения</Label>
                            <Input
                              type="number"
                              value={editTeam.losses}
                              onChange={(e) =>
                                setEditTeam({ ...editTeam, losses: parseInt(e.target.value) })
                              }
                            />
                          </div>
                          <div>
                            <Label>Очки</Label>
                            <Input
                              type="number"
                              value={editTeam.points}
                              onChange={(e) =>
                                setEditTeam({ ...editTeam, points: parseInt(e.target.value) })
                              }
                            />
                          </div>
                          <div>
                            <Label>Плей-Офф</Label>
                            <Input
                              value={editTeam.streak}
                              onChange={(e) =>
                                setEditTeam({ ...editTeam, streak: e.target.value })
                              }
                            />
                          </div>
                        </div>
                        <Button onClick={handleSaveTeam} className="w-full">
                          Сохранить
                        </Button>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDeleteTeam(conference, index)}
                >
                  <Icon name="Trash2" size={16} />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Compass" size={24} className="text-primary" />
            Восточная конференция
          </CardTitle>
        </CardHeader>
        <CardContent>
          {renderTeamsTable(easternTeams, 'eastern')}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mt-4 w-full" variant="outline">
                <Icon name="Plus" size={18} className="mr-2" />
                Добавить команду
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Добавить команду в Восточную конференцию</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Название команды</Label>
                  <Input
                    value={newTeam.team}
                    onChange={(e) => setNewTeam({ ...newTeam, team: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Игры</Label>
                    <Input
                      type="number"
                      value={newTeam.games}
                      onChange={(e) =>
                        setNewTeam({ ...newTeam, games: parseInt(e.target.value) })
                      }
                    />
                  </div>
                  <div>
                    <Label>Победы</Label>
                    <Input
                      type="number"
                      value={newTeam.wins}
                      onChange={(e) =>
                        setNewTeam({ ...newTeam, wins: parseInt(e.target.value) })
                      }
                    />
                  </div>
                  <div>
                    <Label>Поражения</Label>
                    <Input
                      type="number"
                      value={newTeam.losses}
                      onChange={(e) =>
                        setNewTeam({ ...newTeam, losses: parseInt(e.target.value) })
                      }
                    />
                  </div>
                  <div>
                    <Label>Овертаймы</Label>
                    <Input
                      type="number"
                      value={newTeam.otl}
                      onChange={(e) =>
                        setNewTeam({ ...newTeam, otl: parseInt(e.target.value) })
                      }
                    />
                  </div>
                  <div>
                    <Label>Очки</Label>
                    <Input
                      type="number"
                      value={newTeam.points}
                      onChange={(e) =>
                        setNewTeam({ ...newTeam, points: parseInt(e.target.value) })
                      }
                    />
                  </div>
                  <div>
                    <Label>Серия</Label>
                    <Input
                      value={newTeam.streak}
                      onChange={(e) => setNewTeam({ ...newTeam, streak: e.target.value })}
                    />
                  </div>
                </div>
                <Button onClick={() => handleAddNewTeam('eastern')} className="w-full">
                  Добавить
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Compass" size={24} className="text-secondary" />
            Западная конференция
          </CardTitle>
        </CardHeader>
        <CardContent>
          {renderTeamsTable(westernTeams, 'western')}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mt-4 w-full" variant="outline">
                <Icon name="Plus" size={18} className="mr-2" />
                Добавить команду
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Добавить команду в Западную конференцию</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Название команды</Label>
                  <Input
                    value={newTeam.team}
                    onChange={(e) => setNewTeam({ ...newTeam, team: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Игры</Label>
                    <Input
                      type="number"
                      value={newTeam.games}
                      onChange={(e) =>
                        setNewTeam({ ...newTeam, games: parseInt(e.target.value) })
                      }
                    />
                  </div>
                  <div>
                    <Label>Победы</Label>
                    <Input
                      type="number"
                      value={newTeam.wins}
                      onChange={(e) =>
                        setNewTeam({ ...newTeam, wins: parseInt(e.target.value) })
                      }
                    />
                  </div>
                  <div>
                    <Label>Поражения</Label>
                    <Input
                      type="number"
                      value={newTeam.losses}
                      onChange={(e) =>
                        setNewTeam({ ...newTeam, losses: parseInt(e.target.value) })
                      }
                    />
                  </div>
                  <div>
                    <Label>Овертаймы</Label>
                    <Input
                      type="number"
                      value={newTeam.otl}
                      onChange={(e) =>
                        setNewTeam({ ...newTeam, otl: parseInt(e.target.value) })
                      }
                    />
                  </div>
                  <div>
                    <Label>Очки</Label>
                    <Input
                      type="number"
                      value={newTeam.points}
                      onChange={(e) =>
                        setNewTeam({ ...newTeam, points: parseInt(e.target.value) })
                      }
                    />
                  </div>
                  <div>
                    <Label>Серия</Label>
                    <Input
                      value={newTeam.streak}
                      onChange={(e) => setNewTeam({ ...newTeam, streak: e.target.value })}
                    />
                  </div>
                </div>
                <Button onClick={() => handleAddNewTeam('western')} className="w-full">
                  Добавить
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamEditor;