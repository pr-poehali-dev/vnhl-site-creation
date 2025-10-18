import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Rule {
  title: string;
  content: string;
}

interface RulesProps {
  rules: Rule[];
}

const Rules = ({ rules }: RulesProps) => {
  if (!rules || rules.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Icon name="BookOpen" size={64} className="text-muted-foreground/50 mb-4" />
        <h3 className="text-2xl font-bold mb-2">На данный момент правил нет</h3>
        <p className="text-muted-foreground text-lg">Ожидайте, они скоро тут появятся</p>
      </div>
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