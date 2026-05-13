import { useState, useEffect } from 'react';
import ApiKeysHeader from './ApiKeysHeader';
import ApiKeysTable from './ApiKeysTable';
import GenerateApiKeyModal from './GenerateApiKeyModal';
import ApiKeySuccessModal from './ApiKeySuccessModal';
import { useParams } from 'react-router-dom';
import apiClient from '../../api/client';

export default function ApiKeysPage() {

  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const [generatedKeyData, setGeneratedKeyData] = useState(null);

  const [apiKeys, setApiKeys] = useState([]);

  const [loadingKeys, setLoadingKeys] = useState(true);

  const { projectId } = useParams();

  useEffect(() => {

    const fetchApiKeys = async () => {

      try {

        const res = await apiClient.get(
          `/api/keys/${projectId}`
        );

        setApiKeys(res.data);

      } catch (error) {

        console.error(
          "Failed to fetch API keys:",
          error
        );

      } finally {

        setLoadingKeys(false);

      }

    };

    fetchApiKeys();

  }, [projectId]);

  const handleGenerateKey = async (data) => {

    try {

      // STEP 1 → create api key
      const keyRes = await apiClient.post(
        `/api/keys/${projectId}`,
        {
          name: data.name
        }
      );

      const apiKeyId = keyRes.data.id;

      // STEP 2 → attach global rate limit
      await apiClient.post(
        `/api/rate-limit/global/${apiKeyId}`,
        {
          refill_rate: data.refillRate,
          capacity: data.capacity
        }
      );

      // STEP 3 → refresh api keys
      const updatedKeys = await apiClient.get(
        `/api/keys/${projectId}`
      );

      setApiKeys(updatedKeys.data);

      // STEP 4 → success modal
      setGeneratedKeyData({
        key: keyRes.data.key,
        name: data.name
      });

      setIsGenerateModalOpen(false);

      setIsSuccessModalOpen(true);

    } catch (error) {

      console.error(
        "Failed to generate API key:",
        error
      );

      alert(
        error.response?.data?.detail ||
        "Something went wrong"
      );

    }

  };

  const handleRevoke = async (keyId) => {

    try {

      await apiClient.delete(
        `/api/keys/${keyId}`
      );

      setApiKeys(prev =>
        prev.filter(key => key.id !== keyId)
      );

    } catch (error) {

      console.error(
        "Failed to revoke API key:",
        error
      );

    }

  };

  const handleUpdateRateLimit = async (
    apiKeyId,
    refillRate,
    capacity
  ) => {

    try {

      await apiClient.post(
        `/api/rate-limit/global/${apiKeyId}`,
        {
          refill_rate: refillRate,
          capacity: capacity
        }
      );

      setApiKeys(prev =>
        prev.map(key =>
          key.id === apiKeyId
            ? {
                ...key,
                refill_rate: refillRate,
                capacity: capacity
              }
            : key
        )
      );

    } catch (error) {

      console.error(
        "Failed to update rate limit:",
        error
      );

    }

  };

  const handleSuccessClose = () => {

    setIsSuccessModalOpen(false);

    setGeneratedKeyData(null);

  };

  return (
    <div>

      <ApiKeysHeader
        onGenerateKey={() =>
          setIsGenerateModalOpen(true)
        }
      />

      <ApiKeysTable
        apiKeys={apiKeys}
        loading={loadingKeys}
        onRevoke={handleRevoke}
        onUpdateRateLimit={handleUpdateRateLimit}
      />

      <GenerateApiKeyModal
        isOpen={isGenerateModalOpen}
        onClose={() =>
          setIsGenerateModalOpen(false)
        }
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