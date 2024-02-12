import { CheckIcon, CopyIcon, XIcon } from "lucide-react";
import PreviewTab from "./PreviewTab";
import { useEffect, useState } from "react";
import Prism from 'prismjs';
import 'prismjs/components/prism-cshtml';
import 'prismjs/themes/prism-okaidia.css';
import useCopyToClipboard from "@/hooks/useCopyToClipboard";

type Props = {
  html: string;
  closeModal: () => void;
}

export default function PreviewModal({html, closeModal}: Props) {
  const [activeTab, setActiveTab] = useState<'preview' |'code'>('preview');
  const [isCopied, copy] = useCopyToClipboard();

  useEffect(() => {
    Prism.highlightAll();

  }, [html, activeTab])

  return (
    <dialog className='fixed inset-0 flex justify-center items-center z-[2000] bg-black/50 h-screen w-screen'>
      <div className='bg-white rounded-lg shadow-xl flex flex-col h-[calc(100%-100px)] w-[calc(100%-100px)]'>
        <header className='relative p-3 border-b'>
          <div className='flex justify-center space-x-2'>
            <PreviewTab active={activeTab === 'preview'} onClick={() => setActiveTab('preview')}>Preview</PreviewTab>
            <PreviewTab active={activeTab === 'code'} onClick={() => setActiveTab('code')}>Code</PreviewTab>
          </div>
          <button onClick={closeModal} className='absolute right-3 top-3 rounded-lg, hover:bg-gray-200 p-2'>
            <XIcon className='w-6 h-6 text-gray-600'/>
          </button>
        </header>
        {activeTab === 'preview' ? (
          <iframe srcDoc={html} className='w-full h-full'/>
        ) : (
          <pre className='overflow-auto relative h-full'>
            <button onClick={() => copy(html)} className='absolute right-2 top-2 p-2 rounded-lg hover:bg-gray-700'>
              {isCopied ?(
                <CheckIcon className='w-6 h-6 text-green-400'/>
              ) : (
                <CopyIcon className='w-6 h-6' />
              ) }
              
            </button>
            <code className='language-markup'>{html}</code>
          </pre>
          )}
        
      </div>

    </dialog>
  );
}
