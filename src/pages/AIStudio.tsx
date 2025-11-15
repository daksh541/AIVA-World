import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Sparkles,
  User,
  Palette,
  Brain,
  Mic,
  Save,
  Download,
  Play,
  Undo,
  Redo,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';
import { toast } from 'sonner';

export default function AIStudio() {
  const [styleMode, setStyleMode] = useState(50);
  const [empathy, setEmpathy] = useState([50]);
  const [humor, setHumor] = useState([50]);
  const [intelligence, setIntelligence] = useState([75]);
  const [selectedGender, setSelectedGender] = useState('Female');
  const [selectedBodyType, setSelectedBodyType] = useState('');
  const [selectedHairColor, setSelectedHairColor] = useState('');
  const [selectedVoice, setSelectedVoice] = useState('');
  const [selectedAccent, setSelectedAccent] = useState('');
  const [selectedPersonality, setSelectedPersonality] = useState('');

  const handleSave = () => {
    toast.success('Avatar saved successfully! 🎉');
  };

  const handleExport = () => {
    toast.success('Avatar settings exported!');
  };

  const handleTest = () => {
    toast.info('Testing avatar interactions...');
  };

  const handleUndo = () => {
    toast.info('Undo last change');
  };

  const handleRedo = () => {
    toast.info('Redo last change');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black">
      <Navbar />

      <div className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4 flex items-center gap-3">
                <Sparkles className="w-10 h-10" />
                AI Studio
              </h1>
              <p className="text-xl text-muted-foreground">
                Create and customize your perfect virtual avatar
              </p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="neon-border" onClick={handleUndo}>
                <Undo className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className="neon-border" onClick={handleRedo}>
                <Redo className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Preview Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-2"
          >
            <Card className="glass-effect neon-border p-8 h-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Avatar Preview</h2>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="neon-border" onClick={handleTest}>
                    <Play className="w-4 h-4 mr-2" />
                    Test
                  </Button>
                  <Button size="sm" className="bg-gradient-to-r from-neon-blue to-neon-purple" onClick={handleSave}>
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                </div>
              </div>

              {/* Avatar Display */}
              <div className="aspect-square bg-gradient-to-br from-neon-blue/10 via-neon-purple/10 to-neon-pink/10 rounded-2xl flex items-center justify-center relative overflow-hidden mb-6">
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    background: [
                      'radial-gradient(circle at 20% 50%, rgba(0, 212, 255, 0.2) 0%, transparent 50%)',
                      'radial-gradient(circle at 80% 50%, rgba(181, 55, 255, 0.2) 0%, transparent 50%)',
                      'radial-gradient(circle at 50% 80%, rgba(255, 46, 151, 0.2) 0%, transparent 50%)',
                      'radial-gradient(circle at 20% 50%, rgba(0, 212, 255, 0.2) 0%, transparent 50%)',
                    ],
                  }}
                  transition={{ duration: 10, repeat: Infinity }}
                />
                <div className="relative z-10 text-center">
                  <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Sparkles className="w-32 h-32 text-neon-purple mx-auto mb-4" />
                  </motion.div>
                  <p className="text-2xl font-bold text-gradient">Your Avatar</p>
                  <p className="text-muted-foreground mt-2">Customize appearance and personality</p>
                  {selectedGender && (
                    <Badge className="mt-4 bg-neon-blue/20 text-neon-blue border-neon-blue/50">
                      {selectedGender}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Style Slider */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-lg">Art Style</Label>
                  <Badge className="bg-neon-purple/20 text-neon-purple border-neon-purple/50">
                    {styleMode < 50 ? 'Anime' : styleMode > 50 ? 'Realistic' : 'Balanced'}
                  </Badge>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-neon-blue">Anime</span>
                  <Slider
                    value={[styleMode]}
                    onValueChange={(value) => {
                      setStyleMode(value[0]);
                      toast.info(`Style: ${value[0] < 50 ? 'Anime' : value[0] > 50 ? 'Realistic' : 'Balanced'}`);
                    }}
                    max={100}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-sm text-neon-pink">Realistic</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Customization Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <Card className="glass-effect neon-border p-6">
              <Tabs defaultValue="appearance" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="appearance">
                    <User className="w-4 h-4 mr-2" />
                    Look
                  </TabsTrigger>
                  <TabsTrigger value="personality">
                    <Brain className="w-4 h-4 mr-2" />
                    Mind
                  </TabsTrigger>
                  <TabsTrigger value="voice">
                    <Mic className="w-4 h-4 mr-2" />
                    Voice
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="appearance" className="space-y-6">
                  <div>
                    <Label className="mb-3 block">Gender</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Female', 'Male', 'Other'].map((gender) => (
                        <Button
                          key={gender}
                          variant={selectedGender === gender ? 'default' : 'outline'}
                          className={selectedGender === gender ? 'bg-gradient-to-r from-neon-blue to-neon-cyan' : 'neon-border hover:bg-neon-blue/20'}
                          onClick={() => {
                            setSelectedGender(gender);
                            toast.success(`Gender set to ${gender}`);
                          }}
                        >
                          {gender}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="mb-3 block">Body Type</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Slim', 'Athletic', 'Curvy', 'Muscular'].map((type) => (
                        <Button
                          key={type}
                          variant={selectedBodyType === type ? 'default' : 'outline'}
                          className={selectedBodyType === type ? 'bg-gradient-to-r from-neon-purple to-neon-pink' : 'neon-border hover:bg-neon-purple/20'}
                          onClick={() => {
                            setSelectedBodyType(type);
                            toast.success(`Body type set to ${type}`);
                          }}
                        >
                          {type}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="mb-3 block flex items-center gap-2">
                      <Palette className="w-4 h-4 text-neon-pink" />
                      Hair Color
                    </Label>
                    <div className="grid grid-cols-4 gap-2">
                      {['Black', 'Brown', 'Blonde', 'Red', 'Blue', 'Pink', 'Purple', 'White'].map(
                        (color) => (
                          <Button
                            key={color}
                            variant={selectedHairColor === color ? 'default' : 'outline'}
                            size="sm"
                            className={selectedHairColor === color ? 'bg-gradient-to-r from-neon-pink to-neon-purple' : 'neon-border hover:bg-neon-pink/20'}
                            onClick={() => {
                              setSelectedHairColor(color);
                              toast.success(`Hair color set to ${color}`);
                            }}
                          >
                            {color}
                          </Button>
                        )
                      )}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="personality" className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Label>Empathy</Label>
                      <span className="text-sm text-neon-blue">{empathy[0]}%</span>
                    </div>
                    <Slider
                      value={empathy}
                      onValueChange={(value) => {
                        setEmpathy(value);
                        toast.info(`Empathy: ${value[0]}%`);
                      }}
                      max={100}
                      step={1}
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Label>Humor</Label>
                      <span className="text-sm text-neon-purple">{humor[0]}%</span>
                    </div>
                    <Slider
                      value={humor}
                      onValueChange={(value) => {
                        setHumor(value);
                        toast.info(`Humor: ${value[0]}%`);
                      }}
                      max={100}
                      step={1}
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Label>Intelligence</Label>
                      <span className="text-sm text-neon-pink">{intelligence[0]}%</span>
                    </div>
                    <Slider
                      value={intelligence}
                      onValueChange={(value) => {
                        setIntelligence(value);
                        toast.info(`Intelligence: ${value[0]}%`);
                      }}
                      max={100}
                      step={1}
                    />
                  </div>

                  <div>
                    <Label className="mb-3 block">Conversation Style</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Playful', 'Supportive', 'Intellectual', 'Flirty'].map((style) => (
                        <Button
                          key={style}
                          variant={selectedPersonality === style ? 'default' : 'outline'}
                          className={selectedPersonality === style ? 'bg-gradient-to-r from-neon-cyan to-neon-blue' : 'neon-border hover:bg-neon-cyan/20'}
                          onClick={() => {
                            setSelectedPersonality(style);
                            toast.success(`Personality set to ${style}`);
                          }}
                        >
                          {style}
                        </Button>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="voice" className="space-y-6">
                  <div>
                    <Label className="mb-3 block">Voice Type</Label>
                    <div className="space-y-2">
                      {['Calm & Soothing', 'Energetic', 'Seductive', 'Neutral'].map((voice) => (
                        <Button
                          key={voice}
                          variant={selectedVoice === voice ? 'default' : 'outline'}
                          className={selectedVoice === voice ? 'w-full bg-gradient-to-r from-neon-blue to-neon-cyan justify-start' : 'w-full neon-border hover:bg-neon-blue/20 justify-start'}
                          onClick={() => {
                            setSelectedVoice(voice);
                            toast.success(`Voice set to ${voice}`);
                          }}
                        >
                          <Mic className="w-4 h-4 mr-2" />
                          {voice}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="mb-3 block">Accent</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {['American', 'British', 'Japanese', 'French'].map((accent) => (
                        <Button
                          key={accent}
                          variant={selectedAccent === accent ? 'default' : 'outline'}
                          size="sm"
                          className={selectedAccent === accent ? 'bg-gradient-to-r from-neon-purple to-neon-pink' : 'neon-border hover:bg-neon-purple/20'}
                          onClick={() => {
                            setSelectedAccent(accent);
                            toast.success(`Accent set to ${accent}`);
                          }}
                        >
                          {accent}
                        </Button>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            <Card className="glass-effect neon-border p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-neon-cyan" />
                Quick Actions
              </h3>
              <div className="space-y-2">
                <Button className="w-full bg-gradient-to-r from-neon-blue to-neon-cyan" onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Avatar
                </Button>
                <Button variant="outline" className="w-full neon-border" onClick={handleExport}>
                  <Download className="w-4 h-4 mr-2" />
                  Export Settings
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}