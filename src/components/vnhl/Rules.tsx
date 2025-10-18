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
  const [openRules, setOpenRules] = useState<Set<number>>(new Set());

  const toggleRule = (index: number) => {
    const newOpenRules = new Set(openRules);
    if (newOpenRules.has(index)) {
      newOpenRules.delete(index);
    } else {
      newOpenRules.add(index);
    }
    setOpenRules(newOpenRules);
  };

  const expandAll = () => {
    setOpenRules(new Set(rules.map((_, idx) => idx)));
  };

  const collapseAll = () => {
    setOpenRules(new Set());
  };

  const allExpanded = openRules.size === rules.length;

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
    <div className="space-y-3 md:space-y-4">
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={allExpanded ? collapseAll : expandAll}
          className="gap-1 md:gap-2 text-xs md:text-sm"
        >
          <Icon name={allExpanded ? "ChevronsUp" : "ChevronsDown"} size={14} className="md:w-4 md:h-4" />
          <span className="hidden sm:inline">{allExpanded ? 'Свернуть все' : 'Развернуть все'}</span>
          <span className="sm:hidden">{allExpanded ? 'Свернуть' : 'Развернуть'}</span>
        </Button>
      </div>
      <div className="grid gap-2 md:gap-3">
        {rules.map((rule, idx) => (
        <Card 
          key={idx} 
          className="hover:shadow-md transition-all cursor-pointer overflow-hidden"
          onClick={() => toggleRule(idx)}
        >
          <CardHeader className="pb-2 md:pb-3">
            <CardTitle className="flex items-center justify-between text-sm md:text-lg">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <Icon name="FileText" size={16} className="text-primary flex-shrink-0 md:w-[18px] md:h-[18px]" />
                <span className="truncate">{rule.title}</span>
              </div>
              <Icon 
                name={openRules.has(idx) ? "ChevronUp" : "ChevronDown"} 
                size={18} 
                className="text-muted-foreground transition-transform flex-shrink-0 md:w-5 md:h-5"
              />
            </CardTitle>
          </CardHeader>
          {openRules.has(idx) && (
            <CardContent className="pt-0 pb-3 md:pb-4 animate-in slide-in-from-top-2">
              <p className="text-muted-foreground text-xs md:text-sm leading-relaxed whitespace-pre-line">
                {rule.content}
              </p>
            </CardContent>
          )}
        </Card>
        ))}
      </div>
    </div>
  );
};

export default Rules;