import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

interface SiteHeaderProps {
  siteTitle: string;
  siteSubtitle: string;
  siteIcon: string;
  customIconUrl: string;
  iconType: 'lucide' | 'custom';
  isAdmin: boolean;
  isEditDialogOpen: boolean;
  tempTitle: string;
  tempSubtitle: string;
  tempIcon: string;
  tempCustomIconUrl: string;
  tempIconType: 'lucide' | 'custom';
  onEditSite: () => void;
  onSaveSiteSettings: () => void;
  onCloseEditDialog: () => void;
  onTempTitleChange: (value: string) => void;
  onTempSubtitleChange: (value: string) => void;
  onTempIconChange: (value: string) => void;
  onTempIconTypeChange: (value: 'lucide' | 'custom') => void;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SiteHeader = ({
  siteTitle,
  siteSubtitle,
  siteIcon,
  customIconUrl,
  iconType,
  isAdmin,
  isEditDialogOpen,
  tempTitle,
  tempSubtitle,
  tempIcon,
  tempCustomIconUrl,
  tempIconType,
  onEditSite,
  onSaveSiteSettings,
  onCloseEditDialog,
  onTempTitleChange,
  onTempSubtitleChange,
  onTempIconChange,
  onTempIconTypeChange,
  onFileUpload,
}: SiteHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur">
      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-start">
            {iconType === 'custom' && customIconUrl ? (
              <img src={customIconUrl} alt="Logo" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
            ) : (
              <Icon name={siteIcon} size={window.innerWidth < 768 ? 32 : 40} className="text-primary" />
            )}
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <h1 className="text-2xl md:text-4xl font-bold">{siteTitle}</h1>
                {isAdmin && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onEditSite}
                    className="gap-1 h-8"
                  >
                    <Icon name="Pencil" size={14} />
                  </Button>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{siteSubtitle}</p>
            </div>
          </div>
          {!isAdmin ? (
            <Button
              variant="outline"
              onClick={() => navigate('/admin')}
              className="gap-2 w-full md:w-auto"
            >
              <Icon name="Settings" size={18} />
              <span className="hidden sm:inline">Админ-панель</span>
              <Icon name="Settings" size={18} className="sm:hidden" />
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={() => {
                sessionStorage.removeItem('adminAuth');
                window.location.reload();
              }}
              className="gap-2 w-full md:w-auto"
            >
              <Icon name="LogOut" size={18} />
              <span className="hidden sm:inline">Выход</span>
              <Icon name="LogOut" size={18} className="sm:hidden" />
            </Button>
          )}
        </div>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={onCloseEditDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Настройки сайта</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Название сайта</Label>
              <Input
                id="title"
                value={tempTitle}
                onChange={(e) => onTempTitleChange(e.target.value)}
                placeholder="VNHL"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subtitle">Подзаголовок</Label>
              <Input
                id="subtitle"
                value={tempSubtitle}
                onChange={(e) => onTempSubtitleChange(e.target.value)}
                placeholder="Виртуальная Национальная Хоккейная Лига"
              />
            </div>
            <div className="space-y-2">
              <Label>Тип иконки</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={tempIconType === 'lucide' ? 'default' : 'outline'}
                  onClick={() => onTempIconTypeChange('lucide')}
                  className="flex-1"
                >
                  Lucide Icon
                </Button>
                <Button
                  type="button"
                  variant={tempIconType === 'custom' ? 'default' : 'outline'}
                  onClick={() => onTempIconTypeChange('custom')}
                  className="flex-1"
                >
                  Загрузить файл
                </Button>
              </div>
            </div>
            {tempIconType === 'lucide' ? (
              <div className="space-y-2">
                <Label htmlFor="icon">Название иконки (Lucide)</Label>
                <Input
                  id="icon"
                  value={tempIcon}
                  onChange={(e) => onTempIconChange(e.target.value)}
                  placeholder="Trophy"
                />
                <p className="text-xs text-muted-foreground">
                  Используйте название иконки из библиотеки Lucide (например: Trophy, Award, Medal)
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="icon-file">Загрузите файл иконки</Label>
                <Input
                  id="icon-file"
                  type="file"
                  accept="image/*"
                  onChange={onFileUpload}
                />
                {tempCustomIconUrl && (
                  <div className="flex items-center gap-2 p-2 border rounded">
                    <img src={tempCustomIconUrl} alt="Preview" className="w-8 h-8 object-contain" />
                    <span className="text-sm text-muted-foreground">Предпросмотр</span>
                  </div>
                )}
              </div>
            )}
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={onCloseEditDialog}>
                Отмена
              </Button>
              <Button onClick={onSaveSiteSettings}>
                Сохранить
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default SiteHeader;
