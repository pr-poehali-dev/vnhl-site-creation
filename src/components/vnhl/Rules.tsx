import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

interface Rule {
  title: string;
  content: string;
}

interface EmptyMessage {
  title: string;
  subtitle: string;
}

interface RulesProps {
  rules: Rule[];
  isAdmin?: boolean;
  emptyMessage: EmptyMessage;
  onUpdateEmptyMessage: (message: EmptyMessage) => void;
}

const Rules = ({ rules, isAdmin = false, emptyMessage, onUpdateEmptyMessage }: RulesProps) => {
  const [isEditMessageOpen, setIsEditMessageOpen] = useState(false);
  const [tempMessage, setTempMessage] = useState(emptyMessage);
  if (!rules || rules.length === 0) {
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
          <Icon name="BookOpen" size={64} className="text-muted-foreground/50 mb-4 mx-auto" />
          <h3 className="text-2xl font-bold mb-2">{emptyMessage.title}</h3>
          <p className="text-muted-foreground text-lg">{emptyMessage.subtitle}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4">
      {rules.map((rule, idx) => (
        <Card key={idx} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Icon name="FileText" size={20} className="text-primary" />
              {rule.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{rule.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Rules;