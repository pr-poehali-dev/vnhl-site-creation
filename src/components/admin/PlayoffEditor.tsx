import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface PlayoffMatch {
  team1: string;
  team2: string;
  score1: number;
  score2: number;
}

interface PlayoffBracket {
  eastern: {
    round1: PlayoffMatch[];
    round2: PlayoffMatch[];
    round3: PlayoffMatch[];
    final: PlayoffMatch[];
  };
  western: {
    round1: PlayoffMatch[];
    round2: PlayoffMatch[];
    round3: PlayoffMatch[];
    final: PlayoffMatch[];
  };
  grandFinal?: PlayoffMatch[];
}

interface PlayoffEditorProps {
  playoffBracket: PlayoffBracket;
  onUpdatePlayoff: (bracket: PlayoffBracket) => void;
}

const PlayoffEditor = ({ playoffBracket, onUpdatePlayoff }: PlayoffEditorProps) => {
  const updateMatch = (
    conference: 'eastern' | 'western' | 'grandFinal',
    round: 'round1' | 'round2' | 'round3' | 'final' | 'grandFinal',
    index: number,
    field: keyof PlayoffMatch,
    value: string | number
  ) => {
    const updated = { ...playoffBracket };
    
    if (conference === 'grandFinal') {
      if (!updated.grandFinal) updated.grandFinal = [];
      updated.grandFinal[index] = {
        ...updated.grandFinal[index],
        [field]: value,
      };
    } else {
      updated[conference][round as 'round1' | 'round2' | 'round3' | 'final'][index] = {
        ...updated[conference][round as 'round1' | 'round2' | 'round3' | 'final'][index],
        [field]: value,
      };
    }
    
    onUpdatePlayoff(updated);
  };

  const addMatch = (conference: 'eastern' | 'western' | 'grandFinal', round: 'round1' | 'round2' | 'round3' | 'final' | 'grandFinal') => {
    const updated = { ...playoffBracket };
    
    if (conference === 'grandFinal') {
      if (!updated.grandFinal) updated.grandFinal = [];
      updated.grandFinal.push({
        team1: '',
        team2: '',
        score1: 0,
        score2: 0,
      });
    } else {
      updated[conference][round as 'round1' | 'round2' | 'round3' | 'final'].push({
        team1: '',
        team2: '',
        score1: 0,
        score2: 0,
      });
    }
    
    onUpdatePlayoff(updated);
    toast.success('Матч добавлен');
  };

  const deleteMatch = (conference: 'eastern' | 'western' | 'grandFinal', round: 'round1' | 'round2' | 'round3' | 'final' | 'grandFinal', index: number) => {
    const updated = { ...playoffBracket };
    
    if (conference === 'grandFinal') {
      if (updated.grandFinal) {
        updated.grandFinal = updated.grandFinal.filter((_, i) => i !== index);
      }
    } else {
      updated[conference][round as 'round1' | 'round2' | 'round3' | 'final'] = 
        updated[conference][round as 'round1' | 'round2' | 'round3' | 'final'].filter((_, i) => i !== index);
    }
    
    onUpdatePlayoff(updated);
    toast.success('Матч удалён');
  };

  const renderMatchInputs = (
    match: PlayoffMatch,
    conference: 'eastern' | 'western' | 'grandFinal',
    round: 'round1' | 'round2' | 'round3' | 'final' | 'grandFinal',
    index: number
  ) => (
    <div className="p-4 border rounded-lg space-y-3 bg-card/50">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold text-muted-foreground">Матч {index + 1}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => deleteMatch(conference, round, index)}
          className="h-6 w-6 p-0"
        >
          <Icon name="X" size={14} />
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs">Команда 1</Label>
          <Input
            value={match.team1}
            onChange={(e) => updateMatch(conference, round, index, 'team1', e.target.value)}
            className="h-9"
            placeholder="Название команды"
          />
        </div>
        <div>
          <Label className="text-xs">Счёт</Label>
          <Input
            type="number"
            value={match.score1}
            onChange={(e) =>
              updateMatch(conference, round, index, 'score1', parseInt(e.target.value) || 0)
            }
            className="h-9"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs">Команда 2</Label>
          <Input
            value={match.team2}
            onChange={(e) => updateMatch(conference, round, index, 'team2', e.target.value)}
            className="h-9"
            placeholder="Название команды"
          />
        </div>
        <div>
          <Label className="text-xs">Счёт</Label>
          <Input
            type="number"
            value={match.score2}
            onChange={(e) =>
              updateMatch(conference, round, index, 'score2', parseInt(e.target.value) || 0)
            }
            className="h-9"
          />
        </div>
      </div>
    </div>
  );

  const renderRound = (
    conference: 'eastern' | 'western' | 'grandFinal',
    round: 'round1' | 'round2' | 'round3' | 'final' | 'grandFinal',
    title: string,
    matches: PlayoffMatch[]
  ) => (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">{title}</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => addMatch(conference, round)}
          className="h-8"
        >
          <Icon name="Plus" size={14} className="mr-1" />
          Добавить матч
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {matches.map((match, index) => (
          <div key={index}>
            {renderMatchInputs(match, conference, round, index)}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Zap" size={24} className="text-primary" />
            Плей-офф Восточной конференции
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {renderRound('eastern', 'round1', '1/8 финала (Раунд 1)', playoffBracket.eastern.round1)}
          {renderRound('eastern', 'round2', '1/4 финала (Раунд 2)', playoffBracket.eastern.round2)}
          {renderRound('eastern', 'round3', '1/2 финала (Раунд 3)', playoffBracket.eastern.round3)}
          {renderRound('eastern', 'final', 'Финал конференции', playoffBracket.eastern.final)}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Zap" size={24} className="text-secondary" />
            Плей-офф Западной конференции
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {renderRound('western', 'round1', '1/8 финала (Раунд 1)', playoffBracket.western.round1)}
          {renderRound('western', 'round2', '1/4 финала (Раунд 2)', playoffBracket.western.round2)}
          {renderRound('western', 'round3', '1/2 финала (Раунд 3)', playoffBracket.western.round3)}
          {renderRound('western', 'final', 'Финал конференции', playoffBracket.western.final)}
        </CardContent>
      </Card>

      <Card className="border-2 border-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 justify-center text-xl">
            <Icon name="Trophy" size={28} className="text-primary" />
            Главный Финал VNHL
          </CardTitle>
        </CardHeader>
        <CardContent>
          {playoffBracket.grandFinal && playoffBracket.grandFinal.length > 0 
            ? renderRound('grandFinal', 'grandFinal', 'Чемпион VNHL', playoffBracket.grandFinal)
            : (
              <div className="text-center py-4">
                <Button
                  variant="outline"
                  onClick={() => addMatch('grandFinal', 'grandFinal')}
                >
                  <Icon name="Plus" size={18} className="mr-2" />
                  Добавить главный финал
                </Button>
              </div>
            )
          }
        </CardContent>
      </Card>
    </div>
  );
};

export default PlayoffEditor;