import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { TERMS_CONTENT } from '../constants/legalContents';

const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 px-4 max-w-4xl mx-auto">
        <article className="prose lg:prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: TERMS_CONTENT.replace(/\n/g,'<br/>') }} />
      </main>
      <Footer />
    </div>
  );
};

export default TermsPage; 