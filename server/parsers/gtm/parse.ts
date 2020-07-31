import { Container, ParsedContainer } from './types';
import { parseMacros } from './macro';
import { parseTags } from './tags';
import { parseTriggers, parseTriggerGroups } from './triggers';
import { resolveReferences } from './resolver';
import { parseTemplatesAndCode } from './template';
import { filterForTags, filterForTriggers, filterForVariables } from './filters';

export const parseGtm = (container: Container): ParsedContainer => {
  const { resource } = container;
  const { macros, tags, predicates, rules } = resource;

  /**
   * Parse Macros/Variables, get indexes of variables needed to parse triggers,
   * and get indexes of variables that contain "template" values.
   */
  const { parsedVariables, triggerContextVariables, templateContextVariables } = parseMacros(
    macros,
  );

  /**
   * Parse Tags & extract information from 'listener' & 'trigger group' tags.
   * This information will be used during the parsing of the triggers.
   */
  const { parsedTags, triggerContextTags, templateContextTags } = parseTags(tags);

  /**
   * Parse Triggers
   */
  const parsedTriggers = parseTriggers(
    predicates,
    rules,
    triggerContextVariables,
    triggerContextTags,
  );

  /**
   * Create Container object
   */
  const parsedContainer = {
    variables: parsedVariables,
    tags: parsedTags,
    triggers: parsedTriggers,
  };

  /**
   * Resolve References
   */
  resolveReferences(parsedContainer);

  /**
   * Parse Trigger Groups. This happens after resolving the refernces, because
   * resolving the references makes it much easier to connect the trigger group to
   * the correct triggers.
   */
  parseTriggerGroups(parsedTags, parsedTriggers, triggerContextTags);

  /**
   * Parse ['template', ...stuff] arrays. These arrays function as concatenations of
   * strings & variable references, for example in javascript & html fields.
   */
  parseTemplatesAndCode(parsedTags, parsedVariables, templateContextVariables, templateContextTags);

  /**
   * Filtering
   * - Remove 'inner_' tags from
   *    * the main tags array
   *    * tags arrays within triggers
   *    * tags array within tag sequencing
   * - Remove the gtm.triggers variable.
   */
  parsedContainer.tags = filterForTags(parsedTags);
  parsedContainer.triggers = filterForTriggers(parsedTriggers);
  parsedContainer.variables = filterForVariables(parsedVariables);

  return parsedContainer;
};
