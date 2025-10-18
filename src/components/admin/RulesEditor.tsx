import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

interface Rule {
  title: string;
  content: string;
}

interface RulesEditorProps {
  rules: Rule[];
  onUpdateRule: (index: number, updatedRule: Rule) => void;
  onDeleteRule: (index: number) => void;
  onAddRule: (rule: Rule) => void;
}

const RulesEditor = ({ rules, onUpdateRule, onDeleteRule, onAddRule }: RulesEditorProps) => {
  const [editRule, setEditRule] = useState<any>(null);
  const [newRule, setNewRule] = useState({
    title: '',
    content: '',
  });

  const handleEditRule = (rule: Rule, index: number) => {
    setEditRule({ ...rule, index });
  };

  const handleSaveRule = () => {
    if (editRule) {
      onUpdateRule(editRule.index, editRule);
      setEditRule(null);
    }
  };

  const handleAddNewRule = () => {
    onAddRule(newRule);
    setNewRule({
      title: '',
      content: '',
    });
    toast.success('Правило добавлено');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="BookOpen" size={24} className="text-primary" />
          Правила лиги
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {rules.map((rule, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold">{rule.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{rule.content}</p>
                </div>
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditRule(rule, index)}
                      >
                        <Icon name="Pencil" size={16} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Редактировать правило</DialogTitle>
                      </DialogHeader>
                      {editRule && (
                        <div className="space-y-4">
                          <div>
                            <Label>Заголовок</Label>
                            <Input
                              value={editRule.title}
                              onChange={(e) =>
                                setEditRule({ ...editRule, title: e.target.value })
                              }
                            />
                          </div>
                          <div>
                            <Label>Описание</Label>
                            <Textarea
                              value={editRule.content}
                              onChange={(e) =>
                                setEditRule({ ...editRule, content: e.target.value })
                              }
                              rows={4}
                            />
                          </div>
                          <Button onClick={handleSaveRule} className="w-full">
                            Сохранить
                          </Button>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDeleteRule(index)}
                  >
                    <Icon name="Trash2" size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-4 w-full" variant="outline">
              <Icon name="Plus" size={18} className="mr-2" />
              Добавить правило
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Добавить правило</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Заголовок</Label>
                <Input
                  value={newRule.title}
                  onChange={(e) => setNewRule({ ...newRule, title: e.target.value })}
                  placeholder="Формат игры"
                />
              </div>
              <div>
                <Label>Описание</Label>
                <Textarea
                  value={newRule.content}
                  onChange={(e) => setNewRule({ ...newRule, content: e.target.value })}
                  placeholder="Описание правила..."
                  rows={4}
                />
              </div>
              <Button onClick={handleAddNewRule} className="w-full">
                Добавить
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default RulesEditor;
