import { Input, Select as SelectChakra, Stack } from "@chakra-ui/react";
import useResponsive from "../../hooks/useResponsive";
import Drawer from "./Drawer";
import { useState, useEffect } from "react";
import Box from "./Box";

/**
 * @typedef {Object} ArrListOptions
 * @property {String} label
 * @property {String} value
 */
/**
 * @typedef AddPropsSelect
 * @property {ArrListOptions[]} listOptions
 * @property {String} placeholder
 */
/**
 *
 * @param {AddPropsSelect & import("@chakra-ui/react").SelectProps} param0
 * @returns
 */
const Select = ({ listOptions, placeholder = "Select One", value, ...props }) => {
  const { sm } = useResponsive();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [valueSelected, setValueSelected] = useState(value || "");
  
  // Update valueSelected when value prop changes
  useEffect(() => {
    if (value !== undefined) {
      setValueSelected(value);
    }
  }, [value]);

  if (sm) {
    return (
      <>
        <Input
          placeholder={placeholder}
          onClick={() => {
            setOpenDrawer(true);
          }}
          readOnly
          value={listOptions?.find((d) => d?.value === valueSelected)?.label || ""}
        />
        <Drawer
          placement="bottom"
          isOpen={openDrawer}
          onClose={() => {
            setOpenDrawer(false);
          }}
          {...(placeholder && {
            header: <>{placeholder}</>,
          })}
        >
          <Stack>
            {listOptions?.map((opt, idx) => (
              <Box
                key={idx}
                py={5}
                px={2}
                onClick={() => {
                  if (props?.onChange) {
                    props?.onChange(opt?.value);
                  }
                  setOpenDrawer(false);
                  setValueSelected(opt?.value);
                }}
              >
                {opt?.label}
              </Box>
            ))}
          </Stack>
        </Drawer>
      </>
    );
  }
  return (
    <SelectChakra
      placeholder={placeholder}
      value={valueSelected}
      {...props}
      onChange={({ target: { value } }) => {
        setValueSelected(value);
        if (props.onChange) {
          props.onChange(value);
        }
      }}
    >
      {listOptions?.map((opt, idx) => (
        <option key={idx} value={opt?.value}>
          {opt?.label}
        </option>
      ))}
    </SelectChakra>
  );
};
export default Select;
