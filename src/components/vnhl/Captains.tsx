import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { toast } from 'sonner';

interface Captain {
  id: string;
  name: string;
  team: string;
  number: number;
  position: string;
  image: string;
}

interface CaptainsProps {
  captains: Captain[];
  isAdmin: boolean;
  onUpdate: (captains: Captain[]) => void;
}

const Captains = ({ captains, isAdmin, onUpdate }: CaptainsProps) => {
  const [editCaptain, setEditCaptain] = useState<Captain | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newCaptain, setNewCaptain] = useState({
    name: '',
    team: '',
    number: 0,
    position: 'C',
    image: '',
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isEdit: boolean) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isEdit && editCaptain) {
          setEditCaptain({ ...editCaptain, image: reader.result as string });
        } else {
          setNewCaptain({ ...newCaptain, image: reader.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditCaptain = (captain: Captain) => {
    setEditCaptain(captain);
  };

  const handleSaveEdit = () => {
    if (editCaptain) {
      const updated = captains.map((c) => (c.id === editCaptain.id ? editCaptain : c));
      onUpdate(updated);
      setEditCaptain(null);
      toast.success('Капитан обновлён');
    }
  };

  const handleDeleteCaptain = (id: string) => {
    if (confirm('Удалить капитана?')) {
      const updated = captains.filter((c) => c.id !== id);
      onUpdate(updated);
      toast.success('Капитан удалён');
    }
  };

  const handleAddCaptain = () => {
    if (!newCaptain.name || !newCaptain.team) {
      toast.error('Заполните все поля');
      return;
    }
    const captain: Captain = {
      id: Date.now().toString(),
      ...newCaptain,
    };
    onUpdate([...captains, captain]);
    setNewCaptain({ name: '', team: '', number: 0, position: 'C', image: '' });
    setIsAddDialogOpen(false);
    toast.success('Капитан добавлен');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Капитаны команд</h2>
        {isAdmin && (
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Icon name="Plus" size={18} />
                Добавить капитана
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Добавить капитана</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Фото</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, false)}
                  />
                  {newCaptain.image && (
                    <img
                      src={newCaptain.image}
                      alt="Preview"
                      className="mt-2 w-24 h-24 object-cover rounded-lg"
                    />
                  )}
                </div>
                <div>
                  <Label>Имя</Label>
                  <Input
                    value={newCaptain.name}
                    onChange={(e) => setNewCaptain({ ...newCaptain, name: e.target.value })}
                    placeholder="Connor McDavid"
                  />
                </div>
                <div>
                  <Label>Команда</Label>
                  <Input
                    value={newCaptain.team}
                    onChange={(e) => setNewCaptain({ ...newCaptain, team: e.target.value })}
                    placeholder="Edmonton Oilers"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Номер</Label>
                    <Input
                      type="number"
                      value={newCaptain.number}
                      onChange={(e) =>
                        setNewCaptain({ ...newCaptain, number: parseInt(e.target.value) || 0 })
                      }
                    />
                  </div>
                  <div>
                    <Label>Позиция</Label>
                    <Input
                      value={newCaptain.position}
                      onChange={(e) => setNewCaptain({ ...newCaptain, position: e.target.value })}
                      placeholder="C"
                    />
                  </div>
                </div>
                <Button onClick={handleAddCaptain} className="w-full">
                  Добавить
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {captains.map((captain) => (
          <Card key={captain.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="relative aspect-[3/4] bg-gradient-to-br from-primary/20 to-primary/5">
                {captain.image ? (
                  <img
                    src={captain.image}
                    alt={captain.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Icon name="User" size={80} className="text-muted-foreground/30" />
                  </div>
                )}
                {isAdmin && (
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleEditCaptain(captain)}
                        >
                          <Icon name="Pencil" size={16} />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Редактировать капитана</DialogTitle>
                        </DialogHeader>
                        {editCaptain && (
                          <div className="space-y-4">
                            <div>
                              <Label>Фото</Label>
                              <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, true)}
                              />
                              {editCaptain.image && (
                                <img
                                  src={editCaptain.image}
                                  alt="Preview"
                                  className="mt-2 w-24 h-24 object-cover rounded-lg"
                                />
                              )}
                            </div>
                            <div>
                              <Label>Имя</Label>
                              <Input
                                value={editCaptain.name}
                                onChange={(e) =>
                                  setEditCaptain({ ...editCaptain, name: e.target.value })
                                }
                              />
                            </div>
                            <div>
                              <Label>Команда</Label>
                              <Input
                                value={editCaptain.team}
                                onChange={(e) =>
                                  setEditCaptain({ ...editCaptain, team: e.target.value })
                                }
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Номер</Label>
                                <Input
                                  type="number"
                                  value={editCaptain.number}
                                  onChange={(e) =>
                                    setEditCaptain({
                                      ...editCaptain,
                                      number: parseInt(e.target.value) || 0,
                                    })
                                  }
                                />
                              </div>
                              <div>
                                <Label>Позиция</Label>
                                <Input
                                  value={editCaptain.position}
                                  onChange={(e) =>
                                    setEditCaptain({ ...editCaptain, position: e.target.value })
                                  }
                                />
                              </div>
                            </div>
                            <Button onClick={handleSaveEdit} className="w-full">
                              Сохранить
                            </Button>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteCaptain(captain.id)}
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                )}
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-bold text-lg">{captain.name}</h3>
                <p className="text-sm text-muted-foreground">{captain.team}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="font-semibold">#{captain.number}</span>
                  <span className="text-muted-foreground">{captain.position}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {captains.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Icon name="Users" size={48} className="mx-auto mb-4 text-muted-foreground/30" />
            <p className="text-muted-foreground">Пока нет капитанов</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Captains;
