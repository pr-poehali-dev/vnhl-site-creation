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
