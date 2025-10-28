import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StandingsTable from '@/components/vnhl/StandingsTable';
import PlayoffBracket from '@/components/vnhl/PlayoffBracket';
import Schedule from '@/components/vnhl/Schedule';
import Rules from '@/components/vnhl/Rules';
import Captains from '@/components/vnhl/Captains';

interface TabsNavigationProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  easternTeams: any[];
  westernTeams: any[];
  allTeams: any[];
  upcomingGames: any[];
  playoffBracket: any;
  rules: any[];
  captains: any[];
  captainsEmptyMessage: string;
  scheduleEmptyMessage: string;
  rulesEmptyMessage: string;
  isAdmin: boolean;
  onDragStart: (index: number) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (dropIndex: number, conference: 'eastern' | 'western') => void;
}

const TabsNavigation = ({
  activeTab,
  onTabChange,
  easternTeams,
  westernTeams,
  allTeams,
  upcomingGames,
  playoffBracket,
  rules,
  captains,
  captainsEmptyMessage,
  scheduleEmptyMessage,
  rulesEmptyMessage,
  isAdmin,
  onDragStart,
  onDragOver,
  onDrop,
}: TabsNavigationProps) => {
  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-6 md:mb-8">
          <TabsTrigger value="standings" className="text-xs md:text-sm">
            Турнирная таблица
          </TabsTrigger>
          <TabsTrigger value="schedule" className="text-xs md:text-sm">
            Расписание
          </TabsTrigger>
          <TabsTrigger value="playoff" className="text-xs md:text-sm">
            Плей-офф
          </TabsTrigger>
          <TabsTrigger value="captains" className="text-xs md:text-sm">
            Капитаны
          </TabsTrigger>
          <TabsTrigger value="rules" className="text-xs md:text-sm">
            Правила
          </TabsTrigger>
        </TabsList>

        <TabsContent value="standings" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <StandingsTable
              title="Восточная конференция"
              teams={easternTeams}
              isAdmin={isAdmin}
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDrop={(index) => onDrop(index, 'eastern')}
            />
            <StandingsTable
              title="Западная конференция"
              teams={westernTeams}
              isAdmin={isAdmin}
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDrop={(index) => onDrop(index, 'western')}
            />
          </div>
          <StandingsTable title="Общий зачёт" teams={allTeams} isAdmin={false} />
        </TabsContent>

        <TabsContent value="schedule">
          <Schedule games={upcomingGames} emptyMessage={scheduleEmptyMessage} />
        </TabsContent>

        <TabsContent value="playoff">
          <PlayoffBracket bracket={playoffBracket} />
        </TabsContent>

        <TabsContent value="captains">
          <Captains captains={captains} emptyMessage={captainsEmptyMessage} />
        </TabsContent>

        <TabsContent value="rules">
          <Rules rules={rules} emptyMessage={rulesEmptyMessage} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TabsNavigation;
