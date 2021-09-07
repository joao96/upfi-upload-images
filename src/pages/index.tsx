import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    async ({ pageParam = 0 }) => {
      const result = await api.get(`/api/images`, {
        params: {
          after: pageParam,
        },
      });
      return result;
    },
    {
      getNextPageParam: lastPage => {
        return lastPage.data.after ?? null;
      },
    }
  );

  const formattedData = useMemo(() => {
    if (data?.pages) {
      const unformattedData = data.pages;
      return unformattedData.map(page => page.data.data).flat();
    }
    return [];
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && (
          <Button
            mt="10"
            isLoading={isFetchingNextPage}
            loadingText="Carregando..."
            onClick={() => fetchNextPage()}
            colorSchema="orange"
          >
            Carregar mais
          </Button>
        )}
      </Box>
    </>
  );
}
