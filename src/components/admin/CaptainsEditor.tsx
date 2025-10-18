import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

interface Captain {
  id: string;
  name: string;
  team: string;
  number: number;
  position: string;
  image: string;
}

interface CaptainsEditorProps {
  captains: Captain[];
  onUpdateCaptain: (index: number, updatedCaptain: Captain) => void;
  onDeleteCaptain: (index: number) => void;
  onAddCaptain: (captain: Captain) => void;
}

const CaptainsEditor = ({
  captains,
  onUpdateCaptain,
  onDeleteCaptain,
  onAddCaptain,
}: CaptainsEditorProps) => {
  const [editCaptain, setEditCaptain] = useState<Captain | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [newCaptain, setNewCaptain] = useState({
    name: '',
    team: '',
    number: 0,
    position: 'C',
    image: '',
  });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

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

  const handleEditCaptain = (captain: Captain, index: number) => {
    setEditCaptain(captain);
    setEditIndex(index);
  };

  const handleSaveEdit = () => {
    if (editCaptain && editIndex !== null) {
      onUpdateCaptain(editIndex, editCaptain);
      setEditCaptain(null);
      setEditIndex(null);
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
    onAddCaptain(captain);
    setNewCaptain({ name: '', team: '', number: 0, position: 'C', image: '' });
    setIsAddDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Users" size={24} className="text-primary" />
            Капитаны команд
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {captains.map((captain, index) => (
              <Card key={captain.id} className="overflow-hidden">
                <div className="relative aspect-[3/4] bg-gradient-to-br from-primary/20 to-primary/5">
                  {captain.image ? (
                    <img
                      src={captain.image}
                      alt={captain.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Icon name="User" size={60} className="text-muted-foreground/30" />
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold">{captain.name}</h3>
                  <p className="text-sm text-muted-foreground">{captain.team}</p>
                  <p className="text-sm">
                    #{captain.number} • {captain.position}
                  </p>
                  <div className="flex gap-2 mt-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleEditCaptain(captain, index)}
                        >
                          <Icon name="Pencil" size={16} className="mr-1" />
                          Изменить
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
                      variant="destructive"
                      size="sm"
                      onClick={() => onDeleteCaptain(index)}
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="mt-4 w-full" variant="outline">
                <Icon name="Plus" size={18} className="mr-2" />
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
        </CardContent>
      </Card>
    </div>
  );
};

export default CaptainsEditor;
