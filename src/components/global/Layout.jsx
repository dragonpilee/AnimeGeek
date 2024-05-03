import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import Image from "./Image";

const Layout = ({ children }) => {
  const [search, setSearch] = useState("");
  const [searchParam, setSearchParam] = useSearchParams();
  const navigate = useNavigate();

  const searchHandler = () => {
    searchParam?.set("q", search);
    setSearchParam(searchParam);
    navigate(`/search/?q=${search}`);
  };

  return (
    <Stack direction="column" spacing={1}>
      <Box
        position="sticky"
        top={0}
        zIndex={99}
        bgColor="var(--chakra-colors-chakra-body-bg)"
      >
        <Stack direction="row" alignItems="center">
          <Box
            cursor="pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            <Image src="/icon.png" boxSize={20} />
          </Box>
          <Box style={{ width: "100%" }}>
            <InputGroup>
              <InputLeftElement>
                <SearchIcon />
              </InputLeftElement>
              <Input
                type="search"
                onChange={({ target: { value } }) => {
                  setSearch(value);
                }}
                onKeyUp={(e) => {
                  if (e?.code === "Enter" || e?.key === "Enter") {
                    searchHandler();
                  }
                }}
              />
            </InputGroup>
          </Box>
        </Stack>
      </Box>
      <Box className="content">{children}</Box>
    </Stack>
  );
};
export default Layout;
