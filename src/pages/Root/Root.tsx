import { Eye } from '@components/Eye';
import { IntroPath } from '@pages/Intro';
import { useNavigate } from 'react-router-dom';

export const Root = (): React.ReactNode => {
  const navigate = useNavigate();

  const goToIntro = () => {
    navigate(IntroPath);
  };

  return (
    <section>
      <Eye className='glow' fill='white' onClick={goToIntro} />
    </section>
  );
};
