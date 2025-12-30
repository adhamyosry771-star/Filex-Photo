
import React from 'react';

interface ImageDisplayProps {
  original: string | null;
  secondary: string | null;
  result: string | null;
  isLoading: boolean;
  timer?: number;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ original, secondary, result, isLoading, timer = 0 }) => {
  if (!original && !isLoading) return null;

  const getLoadingMessage = (t: number) => {
    if (t < 5) return "جاري تحليل زوايا التصوير...";
    if (t < 10) return "جاري استخلاص العناصر بدقة...";
    if (t < 15) return "جاري دمج الألوان والظلال...";
    if (t < 20) return "وضع اللمسات النهائية الواقعية...";
    return "أوشكنا على الانتهاء، صبراً جميلاً...";
  };

  return (
    <div className="w-full max-w-5xl mx-auto mb-20 space-y-12">
      {/* Result Card */}
      {(result || isLoading) && (
        <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-xl border border-slate-100 relative overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <h3 className="text-2xl font-bold text-slate-900 text-right">
              {isLoading ? 'جاري السحر الرقمي...' : 'النتيجة النهائية ✨'}
            </h3>
            {!isLoading && (
               <button 
                onClick={() => window.location.reload()} 
                className="text-indigo-600 font-bold text-sm hover:text-indigo-700 transition-colors bg-indigo-50 px-5 py-2 rounded-full"
              >
                تعديل صورة أخرى
              </button>
            )}
          </div>
          
          <div className="aspect-[4/3] md:aspect-[16/9] rounded-2xl overflow-hidden bg-slate-50 flex items-center justify-center relative border border-slate-100">
            {isLoading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm z-10 p-10 text-center">
                <div className="relative mb-8">
                  <div className="absolute inset-0 animate-ping bg-indigo-200 rounded-full scale-125 opacity-40"></div>
                  <div className="relative h-24 w-24 rounded-full border-4 border-indigo-600 flex items-center justify-center bg-white shadow-lg">
                    <span className="text-3xl font-bold text-indigo-600 font-mono">
                      {timer}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <p className="font-bold text-xl text-slate-800">{getLoadingMessage(timer)}</p>
                  <p className="text-xs text-slate-400 font-bold tracking-widest uppercase">AI Processing Engine Active</p>
                </div>
              </div>
            ) : null}

            {result ? (
              <img src={result} alt="Magic Result" className="max-w-full max-h-full object-contain w-full animate-in fade-in zoom-in duration-700" />
            ) : (
              <div className="text-slate-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </div>
          
          {result && !isLoading && (
            <div className="mt-8 flex flex-col items-center gap-6">
              <a 
                href={result} 
                download="magic_edit.png"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-12 py-4 rounded-xl transition-all duration-200 font-bold text-lg shadow-lg hover:shadow-indigo-200 flex items-center gap-3 transform active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                تحميل الصورة النهائية
              </a>
            </div>
          )}
        </div>
      )}

      {/* Preview Row (If no result yet) */}
      {!result && !isLoading && (original || secondary) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 opacity-90">
          {original && (
            <div className="bg-white p-5 rounded-2xl shadow-md border border-slate-100">
              <span className="text-xs font-bold text-slate-400 mb-3 block text-right uppercase tracking-widest">الصورة الأساسية</span>
              <div className="h-48 w-full overflow-hidden rounded-xl bg-slate-50 flex items-center justify-center border border-slate-50">
                <img src={original} className="max-h-full max-w-full object-contain" alt="Background" />
              </div>
            </div>
          )}
          {secondary && (
            <div className="bg-white p-5 rounded-2xl shadow-md border border-slate-100">
              <span className="text-xs font-bold text-slate-400 mb-3 block text-right uppercase tracking-widest">الصورة المراد دمجها</span>
              <div className="h-48 w-full overflow-hidden rounded-xl bg-slate-50 flex items-center justify-center border border-slate-50">
                <img src={secondary} className="max-h-full max-w-full object-contain" alt="Subject" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageDisplay;