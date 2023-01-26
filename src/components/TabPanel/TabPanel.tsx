import { FC } from 'react';
import { Box } from '@mui/material';

export interface TabPanelProps {
  children?: React.ReactNode;
  testId?: string;
  currentTab: string;
  value: string;
}

export const TabPanel: FC<TabPanelProps> = (props) => {
  const { children, value, currentTab, testId, ...other } = props;

  return (
    <div
      role='tabpanel'
      data-testid={testId ?? 'tabpanel'}
      hidden={currentTab !== value}
      id={`tabpanel-${value}`}
      aria-labelledby={`tab-${value}`}
      {...other}
    >
      {currentTab === value && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
};
