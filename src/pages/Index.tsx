import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [currentDivision, setCurrentDivision] = useState<'student' | 'employee'>('student');
  const [completedCourses, setCompletedCourses] = useState<string[]>([]);
  const [coins, setCoins] = useState(0);

  const basicCourse = {
    id: 'basic',
    name: 'Базовый курс',
    duration: '7 дней',
    coins: 200,
    division: 'student',
    completed: completedCourses.includes('basic')
  };

  const internshipCourses = [
    { id: 'intro', name: 'Ввод нового сотрудника', icon: 'UserPlus' },
    { id: 'widgets', name: 'Виджеты', icon: 'Layout' },
    { id: 'tech', name: 'Технические знания', icon: 'Code' },
    { id: 'sales', name: 'Продажи', icon: 'TrendingUp' },
    { id: 'projects', name: 'Ведение проектов', icon: 'Briefcase' },
    { id: 'development', name: 'Разработка', icon: 'Rocket' }
  ];

  const internshipTrajectory = {
    id: 'internship',
    name: 'Траектория "Стажёр"',
    duration: '1,5 месяца',
    coins: 200,
    courses: internshipCourses,
    completed: internshipCourses.every(c => completedCourses.includes(c.id))
  };

  const communicationCourse = {
    id: 'communication',
    name: 'Правила коммуникаций',
    duration: 'После 4 мес.',
    coins: 0,
    division: 'employee',
    completed: completedCourses.includes('communication')
  };

  const toggleCourse = (courseId: string, coinsReward: number) => {
    if (completedCourses.includes(courseId)) {
      setCompletedCourses(completedCourses.filter(id => id !== courseId));
      setCoins(coins - coinsReward);
    } else {
      setCompletedCourses([...completedCourses, courseId]);
      setCoins(coins + coinsReward);
      
      if (courseId === 'basic') {
        setTimeout(() => setCurrentDivision('employee'), 500);
      }
    }
  };

  const internshipProgress = (completedCourses.filter(id => 
    internshipCourses.some(c => c.id === id)
  ).length / internshipCourses.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Система обучения
          </h1>
          <p className="text-lg text-muted-foreground">
            Путь от обучающегося до профессионала
          </p>
        </div>

        <div className="flex justify-center mb-12 animate-scale-in">
          <Card className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 border-0 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center gap-3">
              <Icon name="Coins" className="text-yellow-300" size={32} />
              <div className="text-white">
                <p className="text-sm opacity-90">Ваш баланс</p>
                <p className="text-3xl font-bold">{coins} коинов</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-8">
          
          <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-4 mb-4">
              <Badge className="bg-blue-500 text-white px-4 py-2 text-base">
                Подразделение: Обучающиеся
              </Badge>
              {currentDivision === 'student' && (
                <Badge variant="outline" className="animate-pulse-glow border-blue-500 text-blue-600">
                  Текущий этап
                </Badge>
              )}
            </div>
            
            <Card 
              className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-xl ${
                basicCourse.completed 
                  ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-300' 
                  : 'bg-white hover:bg-gradient-card'
              }`}
              onClick={() => toggleCourse('basic', 200)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${
                    basicCourse.completed ? 'bg-green-500' : 'bg-gradient-to-br from-purple-500 to-pink-500'
                  }`}>
                    <Icon name={basicCourse.completed ? 'CheckCircle2' : 'BookOpen'} className="text-white" size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{basicCourse.name}</h3>
                    <div className="flex gap-4 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Icon name="Clock" size={18} />
                        <span>{basicCourse.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Coins" size={18} className="text-yellow-500" />
                        <span className="font-semibold text-yellow-600">+{basicCourse.coins} коинов</span>
                      </div>
                    </div>
                  </div>
                </div>
                {basicCourse.completed && (
                  <Badge className="bg-green-500 text-white">Завершено</Badge>
                )}
              </div>
            </Card>
          </div>

          <div className="flex justify-center animate-fade-in">
            <div className="flex flex-col items-center">
              <Icon name="ArrowDown" size={32} className="text-purple-500 animate-bounce" />
              <span className="text-sm text-purple-600 font-semibold mt-2">Переход в подразделение</span>
            </div>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-4 mb-4">
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 text-base">
                Подразделение: Сотрудники
              </Badge>
              {currentDivision === 'employee' && !communicationCourse.completed && (
                <Badge variant="outline" className="animate-pulse-glow border-purple-500 text-purple-600">
                  Текущий этап
                </Badge>
              )}
            </div>

            <Card className="p-6 bg-white shadow-lg">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                    {internshipTrajectory.name}
                  </h3>
                  {internshipTrajectory.completed && (
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      Траектория завершена
                    </Badge>
                  )}
                </div>
                
                <div className="flex gap-4 text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <Icon name="Clock" size={18} />
                    <span>{internshipTrajectory.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Coins" size={18} className="text-yellow-500" />
                    <span className="font-semibold text-yellow-600">+{internshipTrajectory.coins} коинов</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="BookMarked" size={18} />
                    <span>{internshipCourses.length} курсов</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>Прогресс</span>
                    <span>{Math.round(internshipProgress)}%</span>
                  </div>
                  <Progress value={internshipProgress} className="h-3" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {internshipCourses.map((course, idx) => {
                  const isCompleted = completedCourses.includes(course.id);
                  return (
                    <Card
                      key={course.id}
                      className={`p-4 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                        isCompleted 
                          ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-300' 
                          : 'hover:bg-gradient-card hover:scale-105'
                      }`}
                      onClick={() => {
                        toggleCourse(course.id, 0);
                        if (internshipCourses.every(c => 
                          completedCourses.includes(c.id) || c.id === course.id
                        ) && !completedCourses.includes(course.id)) {
                          setTimeout(() => {
                            setCoins(coins + 200);
                          }, 300);
                        }
                      }}
                      style={{ animationDelay: `${0.1 * idx}s` }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          isCompleted 
                            ? 'bg-green-500' 
                            : 'bg-gradient-to-br from-purple-400 to-pink-400'
                        }`}>
                          <Icon 
                            name={isCompleted ? 'CheckCircle2' : course.icon} 
                            className="text-white" 
                            size={24} 
                          />
                        </div>
                        <div className="flex-1">
                          <p className={`font-semibold ${isCompleted ? 'text-green-700' : ''}`}>
                            {course.name}
                          </p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </Card>
          </div>

          <div className="flex justify-center animate-fade-in">
            <div className="flex flex-col items-center">
              <Icon name="ArrowDown" size={32} className="text-orange-500 animate-bounce" />
              <span className="text-sm text-orange-600 font-semibold mt-2">После испытательного срока</span>
              <span className="text-xs text-muted-foreground">4 месяца</span>
            </div>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Card 
              className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-xl ${
                communicationCourse.completed 
                  ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-300' 
                  : 'bg-white hover:bg-gradient-card'
              }`}
              onClick={() => toggleCourse('communication', 0)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${
                    communicationCourse.completed 
                      ? 'bg-green-500' 
                      : 'bg-gradient-to-br from-orange-500 to-red-500'
                  }`}>
                    <Icon 
                      name={communicationCourse.completed ? 'CheckCircle2' : 'MessageCircle'} 
                      className="text-white" 
                      size={28} 
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{communicationCourse.name}</h3>
                    <div className="flex gap-4 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Icon name="Calendar" size={18} />
                        <span>{communicationCourse.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Award" size={18} className="text-orange-500" />
                        <span className="font-semibold text-orange-600">Обязательный курс</span>
                      </div>
                    </div>
                  </div>
                </div>
                {communicationCourse.completed && (
                  <Badge className="bg-green-500 text-white">Завершено</Badge>
                )}
              </div>
            </Card>
          </div>

          {completedCourses.includes('communication') && (
            <div className="text-center animate-scale-in mt-8">
              <Card className="inline-block p-8 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 border-0">
                <Icon name="Trophy" className="text-white mx-auto mb-4" size={64} />
                <h2 className="text-3xl font-bold text-white mb-2">Поздравляем!</h2>
                <p className="text-white text-lg">Вы завершили все этапы обучения</p>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
