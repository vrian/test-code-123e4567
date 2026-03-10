import React, { useState } from 'react';
import { LayoutAnimation, Platform, UIManager } from 'react-native';
import { AlertCircle, ChevronDown, ChevronUp } from 'lucide-react-native';
import * as s from './Accordion.styles';
import { theme } from '../../../theme';


if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface AccordionProps {
  title: string;
  description: string;
}

export const Accordion = ({ title, description }: AccordionProps) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <s.Container>
      <s.Header onPress={toggleExpand} activeOpacity={0.7}>
        <AlertCircle color={theme.colors.warning} size={20} />
        <s.Title>{title}</s.Title>
        {expanded ? (
          <ChevronUp color={theme.colors.textSecondary} size={20} />
        ) : (
          <ChevronDown color={theme.colors.textSecondary} size={20} />
        )}
      </s.Header>
      
      {expanded && (
        <s.Content>
          <s.Description>{description}</s.Description>
        </s.Content>
      )}
    </s.Container>
  );
};