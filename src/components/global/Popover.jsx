import {
  PopoverTrigger,
  Popover as PopoverChakra,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
} from "@chakra-ui/react";

/**
 * @typedef AddPropsPopover
 * @property {Element} content
 * @property {Boolean} [useArrow]
 */

/**
 *
 * @param {AddPropsPopover & import("@chakra-ui/react").PopoverProps} props
 * @returns {Element}
 */
const Popover = ({ content, useArrow = true, children }) => {
  return (
    <PopoverChakra>
      <PopoverTrigger>{children}</PopoverTrigger>

      <PopoverContent>
        <PopoverBody>{content}</PopoverBody>
        {useArrow && <PopoverArrow />}
      </PopoverContent>
    </PopoverChakra>
  );
};
export default Popover;
