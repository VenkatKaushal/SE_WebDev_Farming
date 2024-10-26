import React from 'react';
import { useTranslation } from 'react-google-multi-lang';

const TranslateComponent = () => {
  const { setLanguage } = useTranslation();

  return (
    <div>
      <select onChange={(e) => setLanguage(e.target.value)}>
        <option value="as">Assamese</option>
        <option value="bn">Bengali</option>
        <option value="bh">Bhojpuri</option>
        <option value="en">English</option>
        <option value="gu">Gujarati</option>
        <option value="hi">Hindi</option>
        <option value="kn">Kannada</option>
        <option value="ks">Kashmiri</option>
        <option value="ml">Malayalam</option>
        <option value="mr">Marathi</option>
        <option value="ne">Nepali</option>
        <option value="or">Odia</option>
        <option value="pa">Punjabi</option>
        <option value="sa">Sanskrit</option>
        <option value="sd">Sindhi</option>
        <option value="ta">Tamil</option>
        <option value="te">Telugu</option>
        <option value="ur">Urdu</option>
      </select>
    </div>
  );
};

export default TranslateComponent;
