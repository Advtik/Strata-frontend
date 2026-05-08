import { useState } from 'react';
import ApiKeysHeader from './ApiKeysHeader';
import ApiKeysTable from './ApiKeysTable';
import GenerateApiKeyModal from './GenerateApiKeyModal';
import ApiKeySuccessModal from './ApiKeySuccessModal';

export default function ApiKeysPage() {
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [generatedKeyData, setGeneratedKeyData] = useState(null);

  const handleGenerateKey = (keyData) => {
    setGeneratedKeyData(keyData);
    setIsGenerateModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  const handleRevoke = (keyId) => {
    console.log('Revoke key:', keyId);
  };

  const handleSuccessClose = () => {
    setIsSuccessModalOpen(false);
    setGeneratedKeyData(null);
  };

  return (
    <div>
      <ApiKeysHeader onGenerateKey={() => setIsGenerateModalOpen(true)} />
      <ApiKeysTable onRevoke={handleRevoke} />

      <GenerateApiKeyModal
        isOpen={isGenerateModalOpen}
        onClose={() => setIsGenerateModalOpen(false)}
        onGenerate={handleGenerateKey}
      />

      <ApiKeySuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleSuccessClose}
        apiKey={generatedKeyData?.key || ''}
        keyName={generatedKeyData?.name || ''}
      />
    </div>
  );
}
