import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Play,
  Pause,
  RotateCcw,
  Save,
  Download,
  Upload,
  Check,
  SkipForward,
  SkipBack,
} from 'lucide-react';
import { toast } from 'sonner';

interface MotionPreset {
  id: string;
  name: string;
  icon: string;
  duration: number;
  category: 'idle' | 'action' | 'emotion' | 'custom';
}

const defaultPresets: MotionPreset[] = [
  { id: '1', name: 'Sitting', icon: '🪑', duration: 3, category: 'idle' },
  { id: '2', name: 'Standing', icon: '🧍', duration: 2, category: 'idle' },
  { id: '3', name: 'Walking', icon: '🚶', duration: 4, category: 'action' },
  { id: '4', name: 'Waving', icon: '👋', duration: 2, category: 'action' },
  { id: '5', name: 'Happy', icon: '😊', duration: 3, category: 'emotion' },
  { id: '6', name: 'Thinking', icon: '🤔', duration: 4, category: 'emotion' },
  { id: '7', name: 'Dancing', icon: '💃', duration: 5, category: 'action' },
  { id: '8', name: 'Posing', icon: '📸', duration: 3, category: 'action' },
];

export function MotionControlPanel() {
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState([1]);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<'all' | MotionPreset['category']>('all');
  const [customMotions, setCustomMotions] = useState<MotionPreset[]>([]);

  const allPresets = [...defaultPresets, ...customMotions];
  const filteredPresets =
    selectedCategory === 'all'
      ? allPresets
      : allPresets.filter((preset) => preset.category === selectedCategory);

  const handleSelectPreset = (presetId: string) => {
    setSelectedPreset(presetId);
    setCurrentTime(0);
    setIsPlaying(false);
    toast.success(`Selected motion: ${allPresets.find((p) => p.id === presetId)?.name}`);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      toast.info('Playing motion');
    } else {
      toast.info('Paused motion');
    }
  };

  const handleReset = () => {
    setCurrentTime(0);
    setIsPlaying(false);
    toast.info('Motion reset');
  };

  const handleSavePreset = () => {
    if (!selectedPreset) {
      toast.error('Please select a motion first');
      return;
    }
    toast.success('Motion preset saved');
  };

  const handleExportPreset = () => {
    if (!selectedPreset) {
      toast.error('Please select a motion first');
      return;
    }
    toast.success('Motion preset exported');
  };

  const handleImportPreset = () => {
    // In a real app, this would open a file picker
    toast.info('Import feature coming soon');
  };

  const categories: Array<{ value: 'all' | MotionPreset['category']; label: string }> = [
    { value: 'all', label: 'All' },
    { value: 'idle', label: 'Idle' },
    { value: 'action', label: 'Action' },
    { value: 'emotion', label: 'Emotion' },
    { value: 'custom', label: 'Custom' },
  ];

  const selectedPresetData = allPresets.find((p) => p.id === selectedPreset);
  const maxDuration = selectedPresetData?.duration || 5;

  return (
    <div className="space-y-6">
      <Card className="glass-effect neon-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Motion Presets</h3>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleImportPreset}
              className="touch-target"
              aria-label="Import preset"
            >
              <Upload className="w-4 h-4 mr-2" />
              Import
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportPreset}
              disabled={!selectedPreset}
              className="touch-target"
              aria-label="Export preset"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.value)}
              className={
                selectedCategory === category.value
                  ? 'bg-gradient-to-r from-neon-blue to-neon-purple touch-target'
                  : 'touch-target'
              }
              aria-pressed={selectedCategory === category.value}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Preset Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredPresets.map((preset) => (
            <motion.button
              key={preset.id}
              onClick={() => handleSelectPreset(preset.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative p-4 rounded-lg border-2 transition-all touch-target ${
                selectedPreset === preset.id
                  ? 'border-neon-blue bg-neon-blue/20 shadow-lg shadow-neon-blue/50'
                  : 'border-white/20 bg-white/5 hover:border-neon-purple/50 hover:bg-white/10'
              }`}
              aria-pressed={selectedPreset === preset.id}
              aria-label={`Select ${preset.name} motion`}
            >
              {selectedPreset === preset.id && (
                <div className="absolute top-2 right-2">
                  <Check className="w-5 h-5 text-neon-blue" />
                </div>
              )}
              <div className="text-4xl mb-2">{preset.icon}</div>
              <div className="text-sm font-semibold">{preset.name}</div>
              <div className="text-xs text-muted-foreground mt-1">{preset.duration}s</div>
              <Badge
                variant="outline"
                className="mt-2 text-xs"
                style={{
                  borderColor:
                    preset.category === 'idle'
                      ? 'rgba(0, 212, 255, 0.5)'
                      : preset.category === 'action'
                      ? 'rgba(181, 55, 255, 0.5)'
                      : preset.category === 'emotion'
                      ? 'rgba(255, 46, 151, 0.5)'
                      : 'rgba(255, 255, 255, 0.3)',
                }}
              >
                {preset.category}
              </Badge>
            </motion.button>
          ))}
        </div>
      </Card>

      {/* Playback Controls */}
      {selectedPreset && (
        <Card className="glass-effect neon-border p-6">
          <h3 className="text-xl font-bold mb-4">Playback Controls</h3>

          <div className="space-y-6">
            {/* Timeline */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Timeline</Label>
                <span className="text-sm text-muted-foreground">
                  {currentTime.toFixed(1)}s / {maxDuration}s
                </span>
              </div>
              <div className="relative">
                <Slider
                  value={[currentTime]}
                  onValueChange={(value) => setCurrentTime(value[0])}
                  max={maxDuration}
                  step={0.1}
                  className="w-full"
                  aria-label="Motion timeline"
                />
                <div className="absolute inset-0 flex items-center pointer-events-none">
                  <div
                    className="h-2 bg-neon-blue/30 rounded-full"
                    style={{ width: `${(currentTime / maxDuration) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={handleReset}
                className="touch-target"
                aria-label="Reset motion"
              >
                <RotateCcw className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentTime(Math.max(0, currentTime - 0.5))}
                className="touch-target"
                aria-label="Skip backward"
              >
                <SkipBack className="w-5 h-5" />
              </Button>
              <Button
                onClick={handlePlayPause}
                className="w-16 h-16 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple touch-target"
                aria-label={isPlaying ? 'Pause motion' : 'Play motion'}
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentTime(Math.min(maxDuration, currentTime + 0.5))}
                className="touch-target"
                aria-label="Skip forward"
              >
                <SkipForward className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleSavePreset}
                className="touch-target"
                aria-label="Save preset"
              >
                <Save className="w-5 h-5" />
              </Button>
            </div>

            {/* Playback Speed */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Playback Speed</Label>
                <span className="text-sm text-muted-foreground">{playbackSpeed[0]}x</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground">0.25x</span>
                <Slider
                  value={playbackSpeed}
                  onValueChange={setPlaybackSpeed}
                  min={0.25}
                  max={2}
                  step={0.25}
                  className="flex-1"
                  aria-label="Playback speed"
                />
                <span className="text-xs text-muted-foreground">2x</span>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Custom Motion Builder */}
      <Card className="glass-effect neon-border p-6">
        <h3 className="text-xl font-bold mb-4">Custom Motion Builder</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Create custom animations with keyframe editing (Coming Soon)
        </p>
        <Button
          variant="outline"
          disabled
          className="w-full touch-target"
          aria-label="Custom motion builder (coming soon)"
        >
          <span className="opacity-50">Timeline Editor - Coming Soon</span>
        </Button>
      </Card>
    </div>
  );
}

