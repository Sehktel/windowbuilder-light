import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import {withStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Tip from '../Tip';

const styles = () => ({
  title: {
    flexGrow: 1,
  },
});

// создаёт слой и оповещает мир о новых слоях
function addLayer(editor) {
  const l = new $p.EditorInvisible.Contour({parent: undefined});
  l.activate();
  //editor.eve.emit_async('rows', editor.project.ox, {constructions: true});
}

function addFlap(editor) {
  const fillings = editor.project.getItems({class: $p.EditorInvisible.Filling, selected: true});
  if(fillings.length){
    fillings[0].create_leaf();
  }
  else{
    $p.ui.dialogs.alert({text: 'Перед добавлением створки, укажите заполнение, в которое поместить створку', title: 'Добавить створку'});
  }
}

function dropLayer(editor) {
  const {project, eve} = editor;
  const l = project.activeLayer;
  if(l) {
    l.remove();
    project.zoom_fit();
    const {contours} = project;
    if(contours.length) {
      contours[0].activate();
    }
  }
}

function LayersToolbar({editor, classes}) {
  return <Toolbar disableGutters variant="dense">
    <Tip title="Добавить рамный контур">
      <IconButton onClick={() => addLayer(editor)}><i className="fa fa-file-o" /></IconButton>
    </Tip>
    <Tip title="Добавить створку">
      <IconButton onClick={() => addFlap(editor)}><i className="fa fa-file-code-o" /></IconButton>
    </Tip>
    <div className={classes.title} />
    <Tip title="Удалить слой">
      <IconButton onClick={() => dropLayer(editor)}><i className="fa fa-trash-o" /></IconButton>
    </Tip>
  </Toolbar>;
}

LayersToolbar.propTypes = {
  editor: PropTypes.object,
  classes: PropTypes.object.isRequired,
};

export default  withStyles(styles)(LayersToolbar);