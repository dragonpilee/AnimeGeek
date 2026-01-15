import { Box, Text, Stack } from "@chakra-ui/react";
import Select from "./Select";
import { PROVIDERS } from "../../constants";
import useProvider from "../../hooks/useProvider";

const ProviderSelector = ({ showLabel = true, size = "md" }) => {
  const { currentProvider, changeProvider } = useProvider();

  const providerOptions = PROVIDERS.map((provider) => ({
    label: provider.label,
    value: provider.value,
  }));

  return (
    <Stack direction="row" align="center" spacing={2}>
      {showLabel && (
        <Text fontSize="sm" fontWeight="medium" whiteSpace="nowrap">
          Provider:
        </Text>
      )}
      <Box minW="150px">
        <Select
          value={currentProvider}
          onChange={changeProvider}
          size={size}
          listOptions={providerOptions}
          placeholder="Select Provider"
        />
      </Box>
    </Stack>
  );
};

export default ProviderSelector;
