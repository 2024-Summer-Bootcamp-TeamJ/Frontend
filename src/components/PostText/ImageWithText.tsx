import React from 'react';
import HighlightText from './HightlightText';

const ImageWithText: React.FC = () => {
    
    const nickname = '우니님'

    const summaryText = `자신감을 잃는 것은 누구나 겪을 수 있는 자연스러운 과정입니다. 자신이 잘하는 것과 좋아하는 것에 집중하고, 작은 성취를 통해 자부심을 쌓아보세요. 긍정적인 자기 대화와 주변 사람들의 지지를 통해 자신을 긍정적으로 바라보는 연습을 해보세요. 규칙적인 운동과 건강한 생활습관도 신체적 자신감을 유지하는 데 도움이 됩니다. 무엇보다 자신을 믿고 천천히 앞으로 나아가길 바랍니다.`

    const mentor = '오은양'

    
    return (
        <div className="absolute" style={{zIndex: 1, width: '710px'}}>
            <p className='mb-16 text-3xl font-bold text-amber-700' style={{ marginLeft: '15px', paddingLeft: '3px' }}>{nickname}</p>
            <HighlightText text={summaryText} />
            <p className='text-3xl font-bold mt-14 text-amber-700' style={{ textAlign: 'right', marginRight: '30px', paddingRight: '15px', paddingBottom: '10px'}}>{mentor}</p>
        
        </div>  

    );
}

export default ImageWithText;